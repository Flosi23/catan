import { Label } from "@components/ui/label";
import { Counter } from "@components/ui/counter";

export enum TileType {
  Water = "water",
  Desert = "desert",
  Sheep = "sheep",
  Forest = "forest",
  Field = "field",
  Mountain = "mountain",
  Clay = "clay",
  Gold = "gold",
}

const TILE_TYPE_DISPLAY_NAME: Record<TileType, string> = {
  [TileType.Water]: "Water",
  [TileType.Desert]: "Desert",
  [TileType.Sheep]: "Sheep",
  [TileType.Forest]: "Forest",
  [TileType.Field]: "Field",
  [TileType.Mountain]: "Mountain",
  [TileType.Clay]: "Clay",
  [TileType.Gold]: "Gold",
};

interface TileTypeCounterProps {
  type: TileType;
  count: number;
  onChange: (type: TileType, count: number) => void;
  max: number;
}

export const TileTypeCounter = ({ type, count, onChange, max }: TileTypeCounterProps) => {
  return (
    <div className="col-span-full grid grid-cols-subgrid items-center">
      <Label>{TILE_TYPE_DISPLAY_NAME[type]}: </Label>
      <Counter count={count} onChange={(c) => onChange(type, c)} max={max} min={0} />
    </div>
  );
};
