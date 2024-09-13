/**
 * Describes a vector in standard two-dimensional space
 */
export interface Vector2 {
  readonly x: number;
  readonly y: number;
}

function create(x: number, y: number): Vector2 {
  return { x, y };
}

function scale(v: Vector2, n: number): Vector2 {
  return create(v.x * n, v.y * n);
}

function add(a: Vector2, b: Vector2): Vector2 {
  return create(a.x + b.x, a.y + b.y);
}

function equals(a: Vector2, b: Vector2): boolean {
  return a.x === b.x && a.y === b.y;
}

function isOrigin(v: Vector2): boolean {
  return equals(v, create(0, 0));
}

function toString(v: Vector2): string {
  return `(${v.x}, ${v.y})}`;
}

export const Vector2 = {
  create,
  scale,
  toString,
  isOrigin,
  add,
};
