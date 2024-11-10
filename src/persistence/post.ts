import {
  getFirestore,
  collection,
  getDocs,
  query,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { tryCatch } from "./tryCatch";
import { Result } from "@src/domain/Result";
import { parseDoc } from "./utils";
import { CreatePostData, Post } from "@src/domain/Post";

export async function createPost(postData: CreatePostData): Promise<Result<string>> {
    const db = getFirestore();
    const callback = async (): Promise<string> => {
        const ref = await addDoc(collection(db, "posts"), postData);
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

export async function getPosts(): Promise<Result<Post[]>> {
    const db = getFirestore();
    const callback = async (): Promise<Post[]> => {
        const collectionRef = collection(db, "posts");
        const q = query(collectionRef);
        const documents = await getDocs(q);
        if (documents.size > 0) {
            const parsed: Post[] = [];
            documents.forEach((item) => {
                const store = parseDoc<Post>(item);
                parsed.push(store);
            });
            return parsed;
        } else {
            return [];
        }
    };
    return tryCatch(callback);
}