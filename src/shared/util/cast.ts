export function cast<T>(castable: unknown): T {
  return castable as unknown as T
}
