import { Tile } from "./tile";
import { Field as DomainField } from "../../domain/entity/field";

export interface Field {
  tiles: Tile[];
}

function fromDomainEntity(field: DomainField): Field {
  return {
    tiles: field.tiles.map(Tile.fromDomainEntity),
  };
}

function toDomainEntity(field: Field): DomainField {
  return {
    tiles: field.tiles.map(Tile.toDomainEntity),
  };
}

export const Field = {
  fromDomainEntity,
  toDomainEntity,
};
