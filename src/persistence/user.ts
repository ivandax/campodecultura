import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
} from 'firebase/firestore';

import { tryCatch } from './tryCatch';
import { parseDoc } from './utils';
import { AppUser, CreateAppUserData } from '@src/domain/AppUser';
import { Result } from '@src/domain/Result';

async function createUser(
  userData: CreateAppUserData,
  userId: string,
  emailVerified: boolean
): Promise<Result<AppUser>> {
  const db = getFirestore();
  const callback = async (): Promise<AppUser> => {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, userData);
    return { ...userData, id: userId, emailVerified };
  };
  return tryCatch(callback);
}

async function updateUser(
  updateUserData: Partial<CreateAppUserData>,
  id: string
): Promise<Result<void>> {
  const db = getFirestore();
  const callback = async (): Promise<void> => {
    const userRef = doc(db, 'users', id);
    await setDoc(userRef, updateUserData, { merge: true });
  };
  return tryCatch(callback);
}

async function getUser(id: string): Promise<Result<AppUser | null>> {
  const db = getFirestore();
  const callback = async (): Promise<AppUser | null> => {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return parseDoc<AppUser>(docSnap);
    } else {
      return null;
    }
  };
  return tryCatch(callback);
}

async function getAllUsers(): Promise<Result<AppUser[]>> {
  const db = getFirestore();
  const callback = async (): Promise<AppUser[]> => {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    return querySnapshot.docs.map((doc) => parseDoc<AppUser>(doc));
  };
  return tryCatch(callback);
}

export { getUser, createUser, updateUser, getAllUsers };
