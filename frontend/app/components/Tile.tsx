import { ReactElement } from "react";
import { Vector2 } from "@lib/vector2";
import { cn } from "@lib/cn";

export enum TileType {
  Empty = "empty",
  Placeholder = "placeholder",
  Water = "water",
  Desert = "desert",
  Sheep = "sheep",
  Forest = "forest",
  Field = "field",
  Mountain = "mountain",
  Clay = "clay",
  Gold = "gold",
}

export interface Tile {
  type: TileType;
  pos: Vector2;
}

export interface TileProps {
  tile: Tile;
  size: number;
  className?: string;
}

const B = `2px`;

export const Tile = ({ tile, size, className }: TileProps): ReactElement => {
  return (
    <div
      className={cn("hover:drop-shadow-custom absolute cursor-pointer", className)}
      style={{
        left: `${tile.pos.x}px`,
        top: `${tile.pos.y}px`,
      }}>
      <div
        className={cn("relative w-fit bg-white")}
        style={{
          height: `${size}px`,
          aspectRatio: "cos(30deg)",
          clipPath: `polygon(-50% 50%,50% 100%,150% 50%,50% 0)`,
        }}>
        <div className="flex h-full items-center justify-center">{tile.type}</div>
        <div
          className="absolute inset-0 bg-black"
          style={{
            clipPath: `
             polygon(
                50% 0,
                -50% 50%,
                50% 100%,
                150% 50%,
                50% 0,
                50% ${B},
                calc(100% - ${B}*sin(60deg)) calc(25% + ${B}*cos(60deg)),
                calc(100% - ${B}*sin(60deg)) calc(75% - ${B}*cos(60deg)),
                50% calc(100% - ${B}),
                calc(${B}*sin(60deg)) calc(75% - ${B}*cos(60deg)),
                calc(${B}*sin(60deg)) calc(25% + ${B}*cos(60deg)),
                50% ${B}
             )
            `,
          }}></div>
      </div>
    </div>
  );
};
