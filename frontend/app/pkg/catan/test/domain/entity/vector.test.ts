import { describe, expect, it } from "vitest";
import { Vector } from "../../../domain/entity/vector";

describe("create", () => {
  it("correctly creates a new vector", () => {
    const vector = Vector.create(1, 2);
    const expected = { q: 1, r: 2 };
    expect(vector).toStrictEqual(expected);
  });
});

describe("equals", () => {
  it("returns false if vectors are not equal", () => {
    const a = Vector.create(1, 0);
    const b = Vector.create(0, 1);

    expect(Vector.equals(a, b)).toBe(false);
  });
  it("returns true if vector are equal", () => {
    const a = Vector.create(2, 2);
    const b = Vector.create(2, 2);

    expect(Vector.equals(a, b)).toBe(true);
  });
});

describe("add", () => {
  it("correctly adds two vectors", () => {
    const a = Vector.create(1, 2);
    const b = Vector.create(3, 0);
    const expected = Vector.create(4, 2);
    expect(Vector.add(a, b)).toStrictEqual(expected);
  });
});
