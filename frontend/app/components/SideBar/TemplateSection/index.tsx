import { Section } from "@components/SideBar/Section";
import { TileType, TileTypeCounter } from "./TilesTabContent/TileTypeCounter";
import { getEntries } from "@lib/object";
import { Label } from "@components/ui/label";
import { useMemo } from "react";
import { Token } from "./TokensTabContent/TokenCounter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { TilesTabContent } from "@components/SideBar/TemplateSection/TilesTabContent";
import { TokensTabContent } from "@components/SideBar/TemplateSection/TokensTabContent";
import { Catan } from "@catan";

type PartialTileTypeMap = Partial<Record<TileType, number>>;
type PartialTokenMap = Partial<Record<Token, number>>;

interface Template {
  tileTypesMap: PartialTileTypeMap;
  tokensMap: PartialTokenMap;
}

interface TemplateSectionProps {
  template: Template;
  onChange: (template: Template) => void;
  totalTilesCount: number;
}

export const TemplateSection = ({ template, onChange, totalTilesCount }: TemplateSectionProps) => {
  const onTileTypesMapChange = (tileTypesMap: PartialTileTypeMap) => {
    onChange({ ...template, tileTypesMap });
  };

  const onTokensMapChange = (tokensMap: PartialTokenMap) => {
    onChange({ ...template, tokensMap });
  };

  const allowedTokensCount = useMemo(() => Catan.calculateAllowedTokensCount(template), [template]);

  return (
    <Section
      title="Template"
      description="The template defines which tile types and the amount of each tile type that can be placed on the field by the generator.">
      <Tabs defaultValue="tiles">
        <TabsList className="w-full *:w-full">
          <TabsTrigger value="tiles">Tiles</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
        </TabsList>
        <TabsContent value="tiles">
          <TilesTabContent
            tileTypesMap={template.tileTypesMap}
            onChange={onTileTypesMapChange}
            totalTilesCount={totalTilesCount}
          />
        </TabsContent>
        <TabsContent value="tokens">
          <TokensTabContent
            tokensMap={template.tokensMap}
            onChange={onTokensMapChange}
            totalTokensCount={allowedTokensCount}
          />
        </TabsContent>
      </Tabs>
    </Section>
  );
};
