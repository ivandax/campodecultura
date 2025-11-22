import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

export function parseDoc<T>(document: QueryDocumentSnapshot<DocumentData>): T {
  const parsed = {
    id: document.id,
    ...document.data(),
  };
  return parsed as T;
}
