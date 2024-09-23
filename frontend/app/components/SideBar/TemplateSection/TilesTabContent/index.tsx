import { TileType, TileTypeCounter } from "./TileTypeCounter";
import { getEntries } from "@lib/object";
import { Label } from "@components/ui/label";
import { useMemo } from "react";

type TileTypeMap = Record<TileType, number>;
type PartialTileTypeMap = Partial<TileTypeMap>;

interface TilesTabContent {
  tileTypesMap: PartialTileTypeMap;
  onChange: (tileTypeMap: PartialTileTypeMap) => void;
  totalTilesCount: number;
}

export const TilesTabContent = ({ tileTypesMap, onChange, totalTilesCount }: TilesTabContent) => {
  const onCountChange = (type: TileType, count: number) => {
    return onChange({ ...tileTypesMap, [type]: count });
  };

  const tilesLeftCount = useMemo(
    () => Object.values(tileTypesMap).reduce((acc, curr) => acc - curr, totalTilesCount),
    [tileTypesMap, totalTilesCount],
  );

  return (
    <div>
      <div className="flex flex-row gap-4 *:flex *:flex-row *:items-center *:gap-2">
        <div>
          <Label>Total number of tiles: </Label>
          <p>{totalTilesCount}</p>
        </div>

        <div>
          <Label>Tiles left: </Label>
          <p>{tilesLeftCount}</p>
        </div>
      </div>
      <div className="mt-4 grid w-fit auto-cols-min grid-cols-2 gap-x-1 gap-y-2">
        {getEntries(tileTypesMap as TileTypeMap).map(([type, count]) => (
          <TileTypeCounter
            key={type}
            type={type}
            count={count}
            onChange={onCountChange}
            max={count + tilesLeftCount}
          />
        ))}
      </div>
    </div>
  );
};
