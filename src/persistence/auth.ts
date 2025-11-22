import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  User as FirebaseUser,
  Unsubscribe,
  sendPasswordResetEmail,
  applyActionCode,
  verifyPasswordResetCode,
  confirmPasswordReset,
  signInWithPopup,
} from 'firebase/auth';
import { tryCatch } from './tryCatch';
import { Result } from '@src/domain/Result';
import { provider } from '@src/google-auth';

async function signup(email: string, password: string): Promise<Result<void>> {
  const callback = async (): Promise<void> => {
    const auth = getAuth();
    const createResult = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    sendEmailVerification(createResult.user);
  };
  return tryCatch(callback);
}

async function logout(): Promise<Result<void>> {
  const callback = async (): Promise<void> => {
    const auth = getAuth();
    const result = await auth.signOut();
    return result;
  };
  return tryCatch(callback);
}

function registerAuthObserver(
  callback: (user: FirebaseUser | null) => Promise<void>
): Unsubscribe {
  const auth = getAuth();
  return onAuthStateChanged(auth, callback);
}

async function login(
  email: string,
  password: string
): Promise<Result<FirebaseUser>> {
  const callback = async (): Promise<FirebaseUser> => {
    const auth = getAuth();
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  };
  return tryCatch(callback);
}

async function requestPasswordReset(email: string): Promise<Result<void>> {
  const callback = async (): Promise<void> => {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
  };
  return tryCatch(callback);
}

async function verifyEmail(oobCode: string): Promise<Result<void>> {
  const callback = async (): Promise<void> => {
    const auth = getAuth();
    await applyActionCode(auth, oobCode);
  };
  return tryCatch(callback);
}

async function verifyPasswordCode(
  oobCode: string
): Promise<Result<{ email: string }>> {
  const callback = async () => {
    const auth = getAuth();
    const email = await verifyPasswordResetCode(auth, oobCode);
    return { email };
  };

  return tryCatch(callback);
}

async function completePasswordReset(
  oobCode: string,
  newPassword: string
): Promise<Result<void>> {
  const callback = async () => {
    const auth = getAuth();
    await confirmPasswordReset(auth, oobCode, newPassword);
  };

  return tryCatch(callback);
}

async function loginWithGoogle(): Promise<Result<FirebaseUser>> {
  const callback = async (): Promise<FirebaseUser> => {
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  };
  return tryCatch(callback);
}

export {
  signup,
  logout,
  login,
  registerAuthObserver,
  requestPasswordReset,
  verifyEmail,
  verifyPasswordCode,
  completePasswordReset,
  loginWithGoogle,
};
