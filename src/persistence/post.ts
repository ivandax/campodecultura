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
  orderBy,
} from "firebase/firestore";
import { tryCatch } from "./tryCatch";
import { Result } from "@src/domain/Result";
import { parseDoc } from "./utils";
import { CreatePostData, Post, PostRetrieveData } from "@src/domain/Post";

export async function createPost(
  postData: CreatePostData
): Promise<Result<string>> {
  const db = getFirestore();
  const callback = async (): Promise<string> => {
    const userRef = doc(db, "users", postData.authorId);
    const ref = await addDoc(collection(db, "posts"), {
      ...postData,
      authorRef: userRef,
    });
    return ref.id;
  };
  return tryCatch(callback);
}

export async function getPost(postId: string): Promise<Result<Post | null>> {
  const db = getFirestore();
  const callback = async (): Promise<Post | null> => {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return parseDoc<Post>(docSnap);
    } else {
      return null;
    }
  };
  return tryCatch(callback);
}

export async function getPosts(
  isAdmin: boolean
): Promise<Result<PostRetrieveData[]>> {
  const db = getFirestore();
  const callback = async (): Promise<PostRetrieveData[]> => {
    const collectionRef = collection(db, "posts");
    const q = isAdmin
      ? query(collectionRef, orderBy("createdOn", "asc"))
      : query(
          collectionRef,
          where("status", "==", "published"),
          orderBy("createdOn", "asc")
        );
    const documents = await getDocs(q);
    if (documents.size > 0) {
      const posts = await Promise.all(
        documents.docs.map(async (doc) => {
          const post = parseDoc<PostRetrieveData>(doc);

          return post;
        })
      );
      console.log(posts);
      return posts;
    } else {
      return [];
    }
  };
  return tryCatch(callback);
}

export async function deletePost(postId: string): Promise<Result<void>> {
  const db = getFirestore();
  const callback = async (): Promise<void> => {
    const docRef = doc(db, "posts", postId);
    await deleteDoc(docRef);
  };
  return tryCatch(callback);
}

export async function editPost(
  postId: string,
  updatedData: Partial<CreatePostData>
): Promise<Result<void>> {
  const db = getFirestore();
  const callback = async (): Promise<void> => {
    const ref = doc(db, "posts", postId);
    await setDoc(ref, updatedData, { merge: true });
  };
  return tryCatch(callback);
}
