import { FieldApplication } from "./application/field";
import { TemplateApplication } from "./application/template";

export const Catan = {
  generateEmptyField: FieldApplication.generateEmptyField,
  generateEmptyTemplate: TemplateApplication.generateEmptyTemplate,
  generateValidField: FieldApplication.generateValidField,
  calculateAllowedTokensCount: TemplateApplication.calculateAllowedTokensCount,
  replaceTile: FieldApplication.replaceTile,
};
