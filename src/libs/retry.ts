import { FleekError } from '@fleek-platform/errors';

export type RetryArgs<T> = {
  fn: () => Promise<T>;
  tries: number;
  intervalMs: number;
};

// TODO: The retry process
// should be handled in the application side
// The SDK shouldn't be responsable for console outputs
export const retry = async <T>({
  fn,
  tries,
  intervalMs,
}: RetryArgs<T>): Promise<T> => {
  let n = 1;

  while (true) {
    try {
      return await fn();
    } catch (error: unknown) {
      if (error instanceof FleekError) {
        console.warn(
          error.toString(),
          `Attempt ${n} of ${tries}. Retrying in ${intervalMs / 1000}s...`,
        );
      }

      if (n === tries) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, intervalMs));
      n++;
    }
  }
};
