import { Vector2 } from "./vector2";

/**
 * Describes a Vector or point in dimensional axial space
 */
export interface VectorAx {
  readonly q: number;
  readonly r: number;
}

function create(q: number, r: number): VectorAx {
  return { q, r };
}

function add(a: VectorAx, b: VectorAx): VectorAx {
  return {
    q: a.q + b.q,
    r: a.r + b.r,
  };
}

function equals(a: VectorAx, b: VectorAx): boolean {
  return a.q === b.q && a.r === b.r;
}

function toVector2(v: VectorAx): Vector2 {
  const x = Math.sqrt(3) * v.q + (Math.sqrt(3) / 2) * v.r;
  const y = (3 / 2) * v.r;
  return Vector2.create(x, y);
}

function round(v: VectorAx): VectorAx {
  const qGrid = Math.round(v.q);
  const rGrid = Math.round(v.r);
  const q = v.q - qGrid;
  const r = v.r - rGrid;

  if (Math.abs(q) >= Math.abs(r)) {
    return create(qGrid + Math.round(q + 0.5 * r), rGrid);
  }

  return create(qGrid, rGrid + Math.round(r + 0.5 * q));
}

export const VectorAx = {
  create,
  add,
  equals,
  toVector2,
  round,
};
