export type GenericEvent = {
  connect: (...args: unknown[]) => unknown
}
export type Connectable = (...args: unknown[]) => unknown | GenericEvent
export type Cleanup = (...args: unknown[]) => unknown
