export type LazyImport<T> = () => Promise<{ default: T } | T>;

export const lazyDeck = <T>(importer: LazyImport<T>): LazyImport<T> => importer;

export const preload = async <T>(importer: LazyImport<T>) => {
  try {
    await importer();
  } catch {
    // no-op
  }
}; 