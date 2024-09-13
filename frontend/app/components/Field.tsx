import { Tile } from "./Tile";
import { ReactElement, useMemo } from "react";
import { Vector2 } from "@lib/vector2";

export interface Field {
  tiles: Tile[];
}

const TILE_SIZE = 120;
const SPACING = 3;

export const Field = ({ tiles: tilesArg }: Field): ReactElement => {
  const tiles = useMemo(
    () =>
      tilesArg.map((t) => ({
        ...t,
        pos: Vector2.scale(t.pos, TILE_SIZE / 2 + SPACING),
      })),
    [tilesArg],
  );

  return (
    <div className="relative m-auto h-full w-full">
      <div className="absolute left-1/2 top-1/2 h-0 w-0">
        <div className="relative">
          {tiles.map((t) => (
            <Tile
              key={Vector2.toString(t.pos)}
              tile={t}
              size={TILE_SIZE}
              className="-translate-x-1/2 -translate-y-1/2"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
