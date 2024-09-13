import { VectorAx } from "@lib/vectorAx";
import { ResourceTile, Tile, TileType } from "../../../domain/entity/tile";
import { describe, expect, it } from "vitest";
import { Template } from "../../../domain/entity/template";
import { Token } from "../../../domain/entity/token";
import { Field } from "../../../domain/entity/field";

function createEmptyTypesMap(): Template["tileTypesMap"] {
  return {
    [TileType.Water]: 0,
    [TileType.Desert]: 0,
    [TileType.Sheep]: 0,
    [TileType.Forest]: 0,
    [TileType.Field]: 0,
    [TileType.Mountain]: 0,
    [TileType.Clay]: 0,
    [TileType.Gold]: 0,
  };
}

function createEmptyTokensMap(): Template["tokensMap"] {
  return {
    [Token.Two]: 0,
    [Token.Three]: 0,
    [Token.Four]: 0,
    [Token.Five]: 0,
    [Token.Six]: 0,
    [Token.Eight]: 0,
    [Token.Nine]: 0,
    [Token.Ten]: 0,
    [Token.Eleven]: 0,
    [Token.Twelve]: 0,
  };
}

describe("getUnsetTileTypes", () => {
  it("returns 0 if the template's field is empty", () => {
    const field = {
      tiles: [],
    };

    const template: Template = {
      tileTypesMap: createEmptyTypesMap(),
      tokensMap: createEmptyTokensMap(),
    };

    expect(Template.getUnsetTileTypes(template, field)).toStrictEqual([]);
  });
  it("returns empty array if no unset tile types exist", () => {
    const field = {
      tiles: [
        { pos: VectorAx.create(0, 0), type: TileType.Sheep },
        {
          pos: VectorAx.create(0, 1),
          type: TileType.Water,
        },
      ],
    };

    const template: Template = {
      tileTypesMap: {
        ...createEmptyTypesMap(),
        [TileType.Sheep]: 1,
        [TileType.Water]: 1,
      },
      tokensMap: createEmptyTokensMap(),
    };

    expect(Template.getUnsetTileTypes(template, field)).toStrictEqual([]);
  });
  it("returns the unset tile types", () => {
    const field = {
      tiles: [
        { pos: VectorAx.create(0, 0), type: TileType.Sheep },
        {
          pos: VectorAx.create(0, 1),
          type: TileType.Water,
        },
        { pos: VectorAx.create(0, 2), type: TileType.Placeholder },
        {
          pos: VectorAx.create(0, 3),
          type: TileType.Empty,
        },
        {
          pos: VectorAx.create(0, 4),
          type: TileType.Empty,
        },
      ],
    };

    const template: Template = {
      tileTypesMap: {
        ...createEmptyTypesMap(),
        [TileType.Sheep]: 2,
        [TileType.Gold]: 1,
        [TileType.Forest]: 1,
        [TileType.Water]: 1,
      },
      tokensMap: createEmptyTokensMap(),
    };

    expect(Template.getUnsetTileTypes(template, field)).toStrictEqual([
      TileType.Sheep,
      TileType.Forest,
      TileType.Gold,
    ]);
  });
});

describe("getUnsetTokens", () => {
  it("returns 0 if the template's field is empty", () => {
    const field = {
      tiles: [],
    };

    const template: Template = {
      tileTypesMap: createEmptyTypesMap(),
      tokensMap: createEmptyTokensMap(),
    };

    expect(Template.getUnsetTokens(template, field)).toStrictEqual([]);
  });
  it("returns empty array if no unset tokens exist", () => {
    const field: Field<ResourceTile> = {
      tiles: [
        { pos: VectorAx.create(0, 0), type: TileType.Forest, token: Token.Six },
        {
          token: Token.Twelve,
          pos: VectorAx.create(0, 1),
          type: TileType.Gold,
        },
      ],
    };

    const template: Template = {
      tileTypesMap: {
        ...createEmptyTypesMap(),
        [TileType.Gold]: 1,
        [TileType.Forest]: 1,
      },
      tokensMap: {
        ...createEmptyTokensMap(),
        [Token.Twelve]: 1,
        [Token.Six]: 1,
      },
    };

    expect(Template.getUnsetTokens(template, field)).toStrictEqual([]);
  });
  it("returns the unset tokens types", () => {
    const field: Field<ResourceTile | Tile> = {
      tiles: [
        { pos: VectorAx.create(0, 0), type: TileType.Field, token: Token.Ten },
        {
          pos: VectorAx.create(0, 1),
          type: TileType.Water,
        },
        { pos: VectorAx.create(0, 2), type: TileType.Placeholder },
        {
          pos: VectorAx.create(0, 3),
          type: TileType.Empty,
        },
      ],
    };

    const template = {
      tileTypesMap: {
        ...createEmptyTypesMap(),
        [TileType.Field]: 1,
        [TileType.Water]: 3,
      },
      tokensMap: {
        ...createEmptyTokensMap(),
        [Token.Ten]: 2,
        [Token.Five]: 1,
      },
    };

    expect(Template.getUnsetTokens(template, field)).toStrictEqual([Token.Five, Token.Ten]);
  });
});
