import { create } from "zustand";
import { Result } from "@src/domain/Result";
import {
  login,
  logout,
  registerAuthObserver,
  signup,
} from "@src/persistence/auth";

import { User as FirebaseUser, Unsubscribe } from "firebase/auth";
import { createUser, getUser, updateUser } from "@src/persistence/user";
import { AppUser, CreateAppUserData } from "@src/domain/AppUser";
import { AsyncOp } from "../types/AsyncOp";

interface AuthState {
  userTask: AsyncOp<AppUser | null, Error>;
  login: (email: string, password: string) => Promise<FirebaseUser | null>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<null | string>;
  initializeAuth: () => Unsubscribe;
}

export const useAuthStore = create<AuthState>((set) => ({
  userTask: { status: "pending" },

  initializeAuth: (): Unsubscribe => {
    const cancelObserver = registerAuthObserver(async (user) => {
      set({ userTask: { status: "in-progress" } });
      if (user) {
        const userProfileResult = await getUser(user.uid);
        if (userProfileResult.data) {
          if (user.emailVerified && !userProfileResult.data.verified) {
            await updateUser({ verified: true }, user.uid);
            set({
              userTask: {
                status: "successful",
                data: { ...userProfileResult.data, verified: true },
              },
            });
          } else {
            set({
              userTask: { status: "successful", data: userProfileResult.data },
            });
          }
        } else {
          const newProfile: CreateAppUserData = {
            email: user.email ?? "",
            name: "",
            createdOn: +new Date(),
            verified: false,
            role: "ADMIN",
          };
          const createResult = await createUser(newProfile, user.uid);
          console.log(createResult);
          if (createResult.data) {
            set({
              userTask: {
                status: "successful",
                data: { ...newProfile, id: user.uid },
              },
            });
          } else {
            set({
              userTask: {
                status: "failed",
                error: new Error("Could not create user"),
              },
            });
          }
        }
      } else {
        set({ userTask: { status: "successful", data: null } });
      }
    });
    return cancelObserver;
  },

  login: async (email, password): Promise<null | FirebaseUser> => {
    set({ userTask: { status: "in-progress" } });
    const result: Result<FirebaseUser> = await login(email, password);
    if (result.error) {
      set({
        userTask: {
          status: "failed",
          error: new Error("Could not login user"),
        },
      });
      return null;
    }
    return result.data;
  },

  logout: async () => {
    set({ userTask: { status: "in-progress" } });
    const result: Result<void> = await logout();
    if (result.error) {
      set({
        userTask: {
          status: "failed",
          error: new Error("Could not logout"),
        },
      });
    }
    set({ userTask: { status: "successful", data: null } });
  },

  signup: async (email, password): Promise<null | string> => {
    set({ userTask: { status: "in-progress" } });
    const result: Result<void> = await signup(email, password);
    if (result.error) {
      console.error(result.error);
      set({
        userTask: {
          status: "failed",
          error: new Error("Could not sign up"),
        },
      });
      return "Error signing up";
    }
    return null;
  },
}));
