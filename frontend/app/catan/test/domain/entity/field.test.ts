import { describe, expect, it } from "vitest";
import { Field } from "../../../domain/entity/field";
import { VectorAx } from "@lib/vectorAx";
import { EmptyTile, ForestTile, Tile, TileType } from "../../../domain/entity/tile";
import { Token } from "../../../domain/entity/token";

describe("replace tile", () => {
  it.fails("throws an error if the tile to replace is nonexistant", () => {
    const tile: Tile = {
      pos: VectorAx.create(1, 0),
      type: TileType.Empty,
    };

    const field: Field = {
      tiles: [
        {
          pos: VectorAx.create(0, 0),
          type: TileType.Empty,
        },
      ],
    };

    Field.replaceTile(field, tile, tile);
  });
  it("replaces the requested tile with the new tile", () => {
    const tile: EmptyTile = {
      pos: VectorAx.create(0, 0),
      type: TileType.Empty,
    };

    const replacement: ForestTile = {
      pos: VectorAx.create(0, 0),
      type: TileType.Forest,
      token: Token.Twelve,
    };

    const field: Field = {
      tiles: [tile],
    };

    const expectedField: Field = {
      tiles: [replacement],
    };

    expect(Field.replaceTile(field, tile, replacement)).toStrictEqual(expectedField);
  });
});
