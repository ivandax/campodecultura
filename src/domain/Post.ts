import { DocumentReference } from "firebase/firestore";
import { AppUser } from "./AppUser";
export interface CreatePostData {
  title: string;
  content: string;
  createdOn: number;
  editedOn: number;
  authorId: string;
  coverImage: string | null;
  categories: string[];
  language: "en" | "es";
  status: "draft" | "published";
  acceptComments: boolean;
}

export type PostRetrieveData = CreatePostData & {
  authorRef: DocumentReference;
  id: string;
};

export type Post = CreatePostData & {
  authorRef: DocumentReference;
  id: string;
  author: AppUser | null;
};
