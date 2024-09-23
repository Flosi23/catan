import { EmptyTile, Tile, TileType, ValidTile } from "./tile";
import { VectorAx } from "@lib/vectorAx";
import { Token } from "./token";

/**
 * A Field consists of a given number of tiles as well as a height
 * and width which describe it's widest and highest point respectively
 */
export interface Field<T extends Tile = Tile> {
  readonly tiles: readonly T[];
}

/**
 * An Empty field only contains empty tiles
 */
export type EmptyField = Field<EmptyTile>;

/**
 * A ValidField is a field that only consists of valid tiles
 */
export type ValidField = Field<ValidTile>;

/**
 * Returns the number tiles of the given type that are present in the field
 */
function countTilesByType(field: Field, type: TileType): number {
  return field.tiles.filter((t) => t.type === type).length;
}

/**
 * Returns the number of tiles with the given token that are present in the field
 */
function countTilesByToken(field: Field, token: Token): number {
  return field.tiles.filter((t) => Tile.isResource(t) && t.token === token).length;
}

/**
 * Replaces the given tile in the field with the replacement
 */
function replaceTile<F extends Tile, T extends F, G extends F>(
  field: Field<F>,
  tile: T,
  replacement: G,
): Field<F> {
  const existingIndex = field.tiles.findIndex((t) => VectorAx.equals(t.pos, tile.pos));
  if (existingIndex === -1) {
    throw new Error("The tile to replace does not exist in field");
  }

  return {
    ...field,
    tiles: field.tiles.map((t, i) => (i === existingIndex ? replacement : t)),
  };
}

export const Field = {
  replaceTile,
  countTilesByType,
  countTilesByToken,
};
