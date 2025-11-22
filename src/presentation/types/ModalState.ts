export type ModalState<T> =
  | { open: true; item: T }
  | { open: false; item: null };
