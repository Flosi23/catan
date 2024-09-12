import { getRandomInt } from "@lib/random";

export function getRandom<T>(array: T[]): T {
  return array[getRandomInt(0, array.length)];
}
