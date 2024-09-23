import { getRandomInt } from "./random";

export function getRandom<T>(array: T[]): T {
  return array[getRandomInt(0, array.length - 1)];
}
