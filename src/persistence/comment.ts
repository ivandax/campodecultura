import {
  getFirestore,
  collection,
  getDocs,
  query,
  addDoc,
  doc,
  getDoc,
  deleteDoc,
  setDoc,
  where,
} from "firebase/firestore";
import { tryCatch } from "./tryCatch";
import { Result } from "@src/domain/Result";
import { parseDoc } from "./utils";
import { CreateCommentData, Comment } from "@src/domain/Comment";

// Create a new comment
export async function createComment(
  commentData: CreateCommentData
): Promise<Result<string>> {
  const db = getFirestore();
  const callback = async (): Promise<string> => {
    const ref = await addDoc(collection(db, "comments"), commentData);
    return ref.id;
  };
  return tryCatch(callback);
}

// Get a comment by ID
export async function getComment(
  commentId: string
): Promise<Result<Comment | null>> {
  const db = getFirestore();
  const callback = async (): Promise<Comment | null> => {
    const docRef = doc(db, "comments", commentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return parseDoc<Comment>(docSnap);
    } else {
      return null;
    }
  };
  return tryCatch(callback);
}

// Get all comments for a specific post
export async function getCommentsByPostId(
  postId: string
): Promise<Result<Comment[]>> {
  const db = getFirestore();
  const callback = async (): Promise<Comment[]> => {
    const collectionRef = collection(db, "comments");
    const q = query(collectionRef, where("postId", "==", postId));
    const documents = await getDocs(q);
    if (documents.size > 0) {
      const parsed: Comment[] = [];
      documents.forEach((item) => {
        const store = parseDoc<Comment>(item);
        parsed.push(store);
      });
      return parsed;
    } else {
      return [];
    }
  };
  return tryCatch(callback);
}

// Delete a comment by ID
export async function deleteComment(commentId: string): Promise<Result<void>> {
  const db = getFirestore();
  const callback = async (): Promise<void> => {
    const docRef = doc(db, "comments", commentId);
    await deleteDoc(docRef);
  };
  return tryCatch(callback);
}

// Edit a comment (update comment text or other fields)
export async function editComment(
  commentId: string,
  updatedData: Partial<CreateCommentData>
): Promise<Result<void>> {
  const db = getFirestore();
  const callback = async (): Promise<void> => {
    const ref = doc(db, "comments", commentId);
    await setDoc(ref, updatedData, { merge: true });
  };
  return tryCatch(callback);
}
