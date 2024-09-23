import { Template as DomainTemplate } from "../../domain/entity/template";
import { TemplateService } from "../../domain/service/template.service";
import { fromEntries, getEntries } from "@lib/object";

enum TileType {
  Water = "water",
  Desert = "desert",
  Sheep = "sheep",
  Forest = "forest",
  Field = "field",
  Mountain = "mountain",
  Clay = "clay",
  Gold = "gold",
}

enum Token {
  Two = "two",
  Three = "three",
  Four = "four",
  Five = "five",
  Six = "six",
  Eight = "eight",
  Nine = "nine",
  Ten = "ten",
  Eleven = "eleven",
  Twelve = "twelve",
}

export interface Template {
  tileTypesMap: Partial<Record<TileType, number>>;
  tokensMap: Partial<Record<Token, number>>;
}

function toDomainEntity(template: Template): DomainTemplate {
  const emptyTemplate = TemplateService.generateEmptyTemplate();
  const tileTypesMap = fromEntries(
    getEntries(emptyTemplate.tileTypesMap).map(([tileType, count]) => {
      return [tileType, template.tileTypesMap[tileType] || count];
    }),
  );
  const tokensMap = fromEntries(
    getEntries(emptyTemplate.tokensMap).map(([token, count]) => {
      return [token, template.tokensMap[token] || count];
    }),
  );
  return {
    tileTypesMap,
    tokensMap,
  };
}

export const Template = {
  toDomainEntity,
};
