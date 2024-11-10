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

interface AuthState {
  user: AppUser | null;
  error: Error | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<FirebaseUser | null>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  initializeAuth: () => Unsubscribe;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  error: null,    
  isLoading: false,

  initializeAuth: (): Unsubscribe => {
    const cancelObserver = registerAuthObserver(async (user) => {
      console.log(user)
      set({ isLoading: true });
      if (user) {
        const userProfileResult = await getUser(user.uid);
        if (userProfileResult.data) {
          if (user.emailVerified) {
            await updateUser({ verified: true }, user.uid);
            set({ user: { ...userProfileResult.data, verified: true } });
          } else {
            set({ user: userProfileResult.data });
          }
        } else {
          const newProfile: CreateAppUserData = {
            email: user.email ?? "",
            name: "",
            createdOn: +new Date(),
            verified: false,
          };
          const createResult = await createUser(newProfile, user.uid);
          if (createResult.data) {
            set({ user: { ...newProfile, id: user.uid } });
          } else {
            set({ user: null });
          }
        }
      } else {
        set({ user: null });
      }
      set({ isLoading: false });
    });
    return cancelObserver;
  },

  login: async (email, password): Promise<null | FirebaseUser> => {
    set({ isLoading: true, error: null });
    const result: Result<FirebaseUser> = await login(email, password);
    if (result.error) {
      set({ error: result.error, isLoading: false });
      return null;
    }
    return result.data
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    const result: Result<void> = await logout();
    if (result.error) {
      set({ error: result.error });
    }
    set({ isLoading: false });
  },

  signup: async (email, password) => {
    set({ isLoading: true, error: null });
    const result: Result<void> = await signup(email, password);
    if (result.error) {
      set({ error: result.error });
    }
    set({ isLoading: false });
  },
}));
