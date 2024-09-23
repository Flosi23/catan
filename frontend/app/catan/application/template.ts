import { TemplateService } from "../domain/service/template.service";
import { Template } from "./entity/template";

function generateEmptyTemplate(): Template {
  return TemplateService.generateEmptyTemplate();
}

function calculateAllowedTokensCount(template: Template): number {
  return TemplateService.calculateAllowedTokensCount(Template.toDomainEntity(template));
}

export const TemplateApplication = {
  generateEmptyTemplate,
  calculateAllowedTokensCount,
};
