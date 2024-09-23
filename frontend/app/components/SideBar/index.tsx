import { cn } from "@lib/cn";
import { GeneralSection } from "@components/SideBar/GeneralSection";
import { TemplateSection } from "@components/SideBar/TemplateSection";
import { TileType } from "@components/SideBar/TemplateSection/TilesTabContent/TileTypeCounter";
import { Token } from "./TemplateSection/TokensTabContent/TokenCounter";
import { Button } from "@components/ui/button";

type PartialTileTypeMap = Partial<Record<TileType, number>>;
type PartialTokenMap = Partial<Record<Token, number>>;

interface Template {
  tileTypesMap: PartialTileTypeMap;
  tokensMap: PartialTokenMap;
}

interface SideBarProps {
  totalTilesCount: number;
  className?: string;
  template: Template;
  fieldSize: number;
  onSizeChange: (size: number) => void;
  onTemplateChange: (template: Template) => void;
  onSubmit: () => void;
}

export const SideBar = ({
  className,
  totalTilesCount,
  template,
  fieldSize,
  onSizeChange,
  onTemplateChange,
  onSubmit,
}: SideBarProps) => {
  return (
    <div className={cn("flex flex-col gap-6 p-4", className)}>
      <GeneralSection size={fieldSize} onSizeChange={onSizeChange} />
      <TemplateSection
        totalTilesCount={totalTilesCount}
        template={template}
        onChange={onTemplateChange}
      />
      <Button onClick={onSubmit}>Generate</Button>
    </div>
  );
};
