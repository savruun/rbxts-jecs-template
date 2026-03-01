interface Module {
  collect: <T extends unknown[]>(
    event: unknown,
    prefire?: () => void,
  ) => [IterableFunction<LuaTuple<[number, ...T]>>, () => T];
}

declare const Module: Module;
export = Module;
