import { Template } from "../entity/template";
import { Tile, TileType } from "../entity/tile";
import { Token } from "../entity/token";
import { getEntries } from "@lib/object";

function generateEmptyTemplate(): Template {
  return {
    tileTypesMap: {
      [TileType.Water]: 0,
      [TileType.Desert]: 0,
      [TileType.Sheep]: 0,
      [TileType.Forest]: 0,
      [TileType.Field]: 0,
      [TileType.Mountain]: 0,
      [TileType.Clay]: 0,
      [TileType.Gold]: 0,
    },
    tokensMap: {
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
    },
  };
}

/**
 * Calculates how many tokens could be placed on fields with the given template
 */
function calculateAllowedTokensCount(template: Template): number {
  return getEntries(template.tileTypesMap)
    .filter(([type]) => Tile.isResourceType(type))
    .reduce((acc, [, count]) => acc + count, 0);
}

export const TemplateService = {
  generateEmptyTemplate,
  calculateAllowedTokensCount,
};
