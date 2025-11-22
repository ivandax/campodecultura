import { Result } from '@src/domain/Result';

async function get<T>(url: string): Promise<Result<T>> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        data: null,
        error: new Error(
          `Failed to fetch data from ${url}. Status: ${response.status}`
        ),
      };
    }
    const data = await response.json();
    const castedData = data as T;
    return { data: castedData, error: null };
  } catch (error) {
    const castedError = error as Error;
    return { data: null, error: castedError };
  }
}

export { get };
