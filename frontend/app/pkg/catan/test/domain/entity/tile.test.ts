import { describe, expect, it } from "vitest";
import { Tile, TileType } from "../../../domain/entity/tile";
import { Vector } from "../../../domain/entity/vector";

describe("isValid", () => {
  it.each([
    [TileType.Empty, false],
    [TileType.Placeholder, false],
    [TileType.Water, true],
    [TileType.Desert, true],
    [TileType.Sheep, true],
    [TileType.Forest, true],
    [TileType.Field, true],
    [TileType.Mountain, true],
    [TileType.Clay, true],
    [TileType.Gold, true],
  ])("%s -> %o", (type, expected) => {
    expect(Tile.isValid({ type: type, pos: Vector.create(0, 0) })).toBe(expected);
  });
});

describe("isResource", () => {
  it.each([
    [TileType.Empty, false],
    [TileType.Placeholder, false],
    [TileType.Water, false],
    [TileType.Desert, false],
    [TileType.Sheep, true],
    [TileType.Forest, true],
    [TileType.Field, true],
    [TileType.Mountain, true],
    [TileType.Clay, true],
    [TileType.Gold, true],
  ])("%s -> %o", (type, expected) => {
    expect(Tile.isResource({ type: type, pos: Vector.create(0, 0) })).toBe(expected);
  });
});

describe("isResourceType", () => {
  it.each([
    [TileType.Empty, false],
    [TileType.Placeholder, false],
    [TileType.Water, false],
    [TileType.Desert, false],
    [TileType.Sheep, true],
    [TileType.Forest, true],
    [TileType.Field, true],
    [TileType.Mountain, true],
    [TileType.Clay, true],
    [TileType.Gold, true],
  ])("%s -> %o", (type, expected) => {
    expect(Tile.isResourceType(type)).toBe(expected);
  });
});
