import { Tile } from "./Tile";
import { ReactElement } from "react";
import { Vector2 } from "@lib/vector2";
import { Catan } from "@catan";

interface Field {
  tiles: Tile[];
}

export interface FieldProps {
  field: Field;
  onChange: (field: Field) => void;
}

export const Field = ({ field, onChange }: FieldProps): ReactElement => {
  const onTileChange = (tile: Tile) => {
    onChange(Catan.replaceTile(field, tile, tile));
  };

  return (
    <div className="relative m-auto h-full w-full">
      <div className="absolute left-1/2 top-1/2 h-0 w-0">
        <div className="relative">
          {field.tiles.map((t) => (
            <Tile
              onChange={onTileChange}
              key={Vector2.toString(t.pos)}
              tile={t}
              className="-translate-x-1/2 -translate-y-1/2"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
