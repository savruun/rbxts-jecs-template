export type Collected<T extends unknown[]> = IterableFunction<
  LuaTuple<[number, ...T]>
>;
