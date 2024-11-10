import { Result } from "@src/domain/Result";

async function tryCatch<T>(callback: () => Promise<T>): Promise<Result<T>> {
    try {
        const data = await callback();
        return { data, error: null };
    } catch (e) {
        console.log(e);
        const castedError = e as Error;
        return { data: null, error: castedError };
    }
}

export { tryCatch };