type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

type ObjectFromEntries<T extends ReadonlyArray<readonly [PropertyKey, unknown]>> = {
  [K in T[number] as K[0]]: K[1];
};

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export function getEntries<T extends object>(obj: T): Entries<T> {
  return Object.entries(obj) as Entries<T>;
}

export function clone<T extends object>(obj: T): Mutable<T> {
  return structuredClone(obj);
}

export function fromEntries<const T extends ReadonlyArray<readonly [PropertyKey, unknown]>>(
  entries: T,
): ObjectFromEntries<T> {
  return Object.fromEntries(entries) as ObjectFromEntries<T>;
}
