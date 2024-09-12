export interface Vector {
  readonly q: number;
  readonly r: number;
}

function create(q: number, r: number): Vector {
  return {
    q,
    r,
  };
}

function add(a: Vector, b: Vector): Vector {
  return {
    q: a.q + b.q,
    r: a.r + b.r,
  };
}

function equals(a: Vector, b: Vector): boolean {
  return a.q === b.q && a.r === b.r;
}

export const Vector = {
  create,
  add,
  equals,
};
