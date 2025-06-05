import {
  BasicTemplate,
  EducationInjection,
  ExperienceInjection,
  SkillsInjection,
} from "../assets/templates/BasicTemplate";
import { ModernTemplate } from "../assets/templates/ModernTemplate";
import { FuncTemplate } from "../assets/templates/FuncTemplate";

import BasicTemplateThumbnail from "../assets/images/templates/BasicTemplate.png";
import ModernTemplateThumbnail from "../assets/images/templates/ModernTemplate.jpg";
import FuncTemplateThumbnail from "../assets/images/templates/FuncTemplate.jpg";

import { TemplateDataType } from "../types/forms";

interface Template {
  name: string;
  html?: any; // TODO: Need to discard this
  renderHtml: (data: TemplateDataType) => string;
  thumbnail: any; // TYPE: Maybe a Number pointing to the image
  injections?: any; // TODO: Need to discard this
}

export const templates = [
    {
        name: "Basic",
        html: BasicTemplate,
        thumbnail: BasicTemplateThumbnail,
        injections: {
            "education_entries": EducationInjection,
            "experience_entries": ExperienceInjection,
            "skill_entries": SkillsInjection,
        }
    },
    {
        name: "Modern",
        renderHtml: ModernTemplate,
        thumbnail: ModernTemplateThumbnail
    },
    {
        name: "Func",
        renderHtml: FuncTemplate,
        thumbnail: FuncTemplateThumbnail
    }
] as Template[];