import { describe, expect, it } from "vitest";
import { VectorAx } from "@lib/vectorAx";

describe("create", () => {
  it("correctly creates a new vector", () => {
    const vector = VectorAx.create(1, 2);
    const expected = { q: 1, r: 2 };
    expect(vector).toStrictEqual(expected);
  });
});

describe("equals", () => {
  it("returns false if vectors are not equal", () => {
    const a = VectorAx.create(1, 0);
    const b = VectorAx.create(0, 1);

    expect(VectorAx.equals(a, b)).toBe(false);
  });
  it("returns true if vector are equal", () => {
    const a = VectorAx.create(2, 2);
    const b = VectorAx.create(2, 2);

    expect(VectorAx.equals(a, b)).toBe(true);
  });
});

describe("add", () => {
  it("correctly adds two vectors", () => {
    const a = VectorAx.create(1, 2);
    const b = VectorAx.create(3, 0);
    const expected = VectorAx.create(4, 2);
    expect(VectorAx.add(a, b)).toStrictEqual(expected);
  });
});
