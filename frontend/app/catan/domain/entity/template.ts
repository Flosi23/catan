import { ValidTile } from "./tile";
import { Token } from "./token";
import { getEntries } from "@lib/object";
import { Field } from "./field";

type TileTypesMap = Readonly<Record<ValidTile["type"], number>>;
type TokensMap = Readonly<Record<Token, number>>;

export interface Template {
  readonly tileTypesMap: TileTypesMap;
  readonly tokensMap: TokensMap;
}

/**
 * Returns the size which is the total number of tiles in the template
 */
function getSize(template: Template): number {
  return Object.values(template.tileTypesMap).reduce((p, c) => p + c, 0);
}

/**
 * A field is compatible when it has the same size as the template,
 * and it does not contain more tokens or tiles of one type than are allowed
 * by the template.
 */
function isCompatibleWithField(template: Template, field: Field): boolean {
  if (getSize(template) !== field.tiles.length) return false;

  const hasCompatibleTiles = getEntries(template.tileTypesMap).every(
    ([tileType, count]) => Field.countTilesByType(field, tileType) <= count,
  );
  const hasCompatibleTokens = getEntries(template.tokensMap).every(
    ([token, count]) => Field.countTilesByToken(field, token) <= count,
  );
  return hasCompatibleTiles && hasCompatibleTokens;
}

/**
 * returns all tile types that are not present in their full capacity on the field because of empty or placeholder tiles
 */
function getUnsetTileTypes(template: Template, field: Field): ValidTile["type"][] {
  if (!isCompatibleWithField(template, field)) {
    throw new Error("field is not compatible with template");
  }

  return getEntries(template.tileTypesMap)
    .filter(([tileType, count]) => Field.countTilesByType(field, tileType) < count)
    .map(([tileType]) => tileType);
}

/**
 * returns all tokens that are not present in their full capacity on the field because of empty or placeholder tiles
 */
function getUnsetTokens(template: Template, field: Field): Token[] {
  if (!isCompatibleWithField(template, field)) {
    throw new Error("field is not compatible with template");
  }

  return getEntries(template.tokensMap)
    .filter(([token, count]) => Field.countTilesByToken(field, token) < count)
    .map(([token]) => token);
}

export const Template = {
  isCompatibleWithField,
  getUnsetTileTypes,
  getUnsetTokens,
};
