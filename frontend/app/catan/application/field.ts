import { FieldService } from "../domain/service/field.service";
import { Field as DomainField } from "../domain/entity/field";
import { Tile as DomainTile } from "../domain/entity/tile";
import { VectorAx } from "@lib/vectorAx";
import { Vector2 } from "@lib/vector2";

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

interface Tile {
  type: TileType;
  pos: Vector2;
}

interface Field {
  tiles: Tile[];
}

function transformField(field: DomainField): Field {
  return {
    tiles: field.tiles.map(transformTile),
  };
}

function transformTile(tile: DomainTile): Tile {
  return {
    type: tile.type,
    pos: VectorAx.toVector2(tile.pos),
  };
}

function generateEmptyField(radius: number): Field {
  const field = FieldService.generateEmptyField(radius);
  return transformField(field);
}

export const FieldApplication = {
  generateEmptyField,
};
