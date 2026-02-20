interface Module {
  collect: <T extends unknown[]>(
    event: unknown,
  ) => IterableFunction<LuaTuple<T>>
}

declare const Module: Module
export = Module
