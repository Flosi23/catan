import { FieldService } from "../domain/service/field.service";
import { Field as DomainField } from "../domain/entity/field";
import { Field } from "./entity/field";
import { Tile } from "./entity/tile";
import { Template } from "./entity/template";

function generateEmptyField(radius: number): Field {
  return Field.fromDomainEntity(FieldService.generateEmptyField(radius));
}

function generateValidField(field: Field, template: Template): Field {
  const domainField = Field.toDomainEntity(field);
  const domainTemplate = Template.toDomainEntity(template);
  return Field.fromDomainEntity(FieldService.generateValidField(domainField, domainTemplate));
}

function replaceTile(field: Field, tile: Tile, replacement: Tile): Field {
  const domainField = Field.toDomainEntity(field);
  const domainTile = Tile.toDomainEntity(tile);
  const domainReplacement = Tile.toDomainEntity(replacement);
  const newField = DomainField.replaceTile(domainField, domainTile, domainReplacement);
  return Field.fromDomainEntity(newField);
}

export const FieldApplication = {
  generateEmptyField,
  generateValidField,
  replaceTile,
};
