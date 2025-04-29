import {
  BasicTemplate,
  EducationInjection,
  ExperienceInjection,
  SkillsInjection,
} from "../assets/templates/BasicTemplate";
import { ModernTemplate } from "../assets/templates/ModernTemplate";

import BasicTemplateThumbnail from "../assets/images/templates/BasicTemplate.png";
import ModernTemplateThumbnail from "../assets/images/templates/ModernTemplate.jpg";

interface Template {
  name: string;
  html: any; // TODO: better type it
  thumbnail: any;
  injections?: any;
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
        html: ModernTemplate,
        thumbnail: ModernTemplateThumbnail
    }
] as Template[];