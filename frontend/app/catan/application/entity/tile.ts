import { Vector2 } from "@lib/vector2";
import { Tile as DomainTile } from "../../domain/entity/tile";
import { VectorAx } from "@lib/vectorAx";

enum TileType {
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

function toDomainEntity(tile: Tile): DomainTile {
  return {
    type: tile.type,
    pos: Vector2.toVectorAx(tile.pos),
  };
}

function fromDomainEntity(tile: DomainTile): Tile {
  return {
    type: tile.type,
    pos: VectorAx.toVector2(tile.pos),
  };
}

export const Tile = {
  toDomainEntity,
  fromDomainEntity,
};
