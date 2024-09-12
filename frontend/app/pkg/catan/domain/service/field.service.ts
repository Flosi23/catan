import { EmptyTile, Tile, TileType, ValidTile } from "../entity/tile";
import { EmptyField, Field, ValidField } from "../entity/field";
import { Vector } from "../entity/vector";
import { Template } from "../entity/template";
import { getRandom } from "@lib/array";

function sortTiles(tiles: readonly Tile[]): readonly Tile[] {
  const getScore = (tile: Tile): number => {
    if (Tile.isResource(tile)) return 0;
    if (Tile.isValid(tile)) return 1;
    if (tile.type === TileType.Placeholder) return 2;
    return 3;
  };

  return tiles.toSorted((a, b) => getScore(a) - getScore(b));
}

function getReplacementTile(tile: Tile, template: Template, field: Field): ValidTile {
  if (Tile.isValid(tile)) return tile;

  const randomTileType = getRandom(
    Template.getUnsetTileTypes(template, field).filter((type) =>
      tile.type === TileType.Placeholder ? type !== TileType.Water : true,
    ),
  );

  if (!Tile.isResourceType(randomTileType)) {
    return {
      type: randomTileType,
      pos: tile.pos,
    };
  }

  const randomToken = getRandom(Template.getUnsetTokens(template, field));
  return {
    type: randomTileType,
    token: randomToken,
    pos: tile.pos,
  };
}

/**
 * Takes a field and a template which must be compatible and replaces any placeholder or empty
 * tiles in the field with valid tiles while respecting the constraints of the template
 */
export function generateValidField(field: Field, template: Template): ValidField {
  if (!Template.isCompatibleWithField(template, field)) {
    throw new Error("given template is incompatible with field");
  }

  /**
   * Sort the tiles so that first
   *   1. All placeholder tiles are replaced
   *   2. All empty tiles are replaced with whatever is left
   *
   * This order is important to prevent that empty tiles are replaced with e.g. Resource tiles
   * and once the placeholder tiles are considered only water tiles are left which cannot be a replacement
   * for placeholder tiles
   */
  const sortedTiles = sortTiles(field.tiles);
  const validTiles: ValidTile[] = [];

  for (const tile of sortedTiles) {
    const replacement = getReplacementTile(tile, template, field);
    field = Field.replaceTile(field, tile, replacement);
    validTiles.push(replacement);
  }

  return {
    ...field,
    tiles: validTiles,
  };
}

/**
 *
 * GenerateEmptyField generates an empty field with the given width and height
 * The height is the number of rows in the field and the width the length of the longest row
 */
function generateEmptyField(width: number, height: number): EmptyField {
  const tiles: EmptyTile[] = [];

  const minQ = getMin(height);
  const maxQ = getMax(height);
  const minR = getMin(width);
  const maxR = getMax(width);

  for (let q = minQ; q <= maxQ; q++) {
    for (let r = minR; r <= maxR; r++) {
      tiles.push({
        pos: Vector.create(q, r),
        type: TileType.Empty,
      });
    }
  }

  return {
    width,
    height,
    tiles,
  };
}

function getMin(n: number): number {
  return -Math.floor((n - 1) / 2);
}

function getMax(n: number): number {
  return Math.ceil((n - 1) / 2);
}

export const FieldService = {
  generateEmptyField,
  generateValidField,
};
