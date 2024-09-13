import { VectorAx } from "@lib/vectorAx";
import { Token } from "./token";

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

/**
 * A Tile is any tile on a hexagonal field even an invalid (placeholder) tile
 */
export interface Tile {
  readonly pos: VectorAx;
  readonly type: TileType;
}

interface TokenTile extends Tile {
  readonly token: Token;
}

export interface EmptyTile extends Tile {
  readonly type: TileType.Empty;
}

export interface PlaceholderTile extends Tile {
  readonly type: TileType.Placeholder;
}

export interface WaterTile extends Tile {
  readonly type: TileType.Water;
}

export interface DesertTile extends Tile {
  readonly type: TileType.Desert;
}

export interface SheepTile extends TokenTile {
  readonly type: TileType.Sheep;
}

export interface ForestTile extends TokenTile {
  readonly type: TileType.Forest;
}

export interface MountainTile extends TokenTile {
  readonly type: TileType.Mountain;
}

export interface FieldTile extends TokenTile {
  readonly type: TileType.Field;
}

export interface ClayTile extends TokenTile {
  readonly type: TileType.Clay;
}

export interface GoldTile extends TokenTile {
  readonly type: TileType.Gold;
}

export type ResourceTile = SheepTile | ForestTile | MountainTile | FieldTile | ClayTile | GoldTile;
export type LandTile = ResourceTile | DesertTile;
export type ValidTile = LandTile | WaterTile;

const resourceTileTypes: ResourceTile["type"][] = [
  TileType.Sheep,
  TileType.Forest,
  TileType.Field,
  TileType.Mountain,
  TileType.Clay,
  TileType.Gold,
];

const validTileTypes: ValidTile["type"][] = [TileType.Water, TileType.Desert, ...resourceTileTypes];

function isValid(tile: Tile): tile is ValidTile {
  return validTileTypes.some((s) => s === tile.type);
}

function isResourceType(type: TileType): type is ResourceTile["type"] {
  return resourceTileTypes.some((t) => t === type);
}

function isResource(tile: Tile): tile is ResourceTile {
  return isResourceType(tile.type);
}

export const Tile = {
  isValid,
  isResourceType,
  isResource,
  resourceTileTypes,
  validTileTypes,
};
