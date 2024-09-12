type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export function getEntries<T extends object>(obj: T): Entries<T> {
  return Object.entries(obj) as Entries<T>;
}

export function clone<T extends object>(obj: T): Mutable<T> {
  return structuredClone(obj);
}
