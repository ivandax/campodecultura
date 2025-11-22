type Success<T> = { data: T; error: null };
type Failure = { data: null; error: Error };
export type Result<T> = Success<T> | Failure;

export type Resource<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};
