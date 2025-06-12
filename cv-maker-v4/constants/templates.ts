import BasicTemplate from "../assets/templates/BasicTemplate";
import ModernTemplate from "../assets/templates/ModernTemplate";
import FuncTemplate from "../assets/templates/FuncTemplate";

import BasicTemplateThumbnail from "../assets/images/templates/BasicTemplate.png";
import ModernTemplateThumbnail from "../assets/images/templates/ModernTemplate.jpg";
import FuncTemplateThumbnail from "../assets/images/templates/FuncTemplate.jpg";

import { TemplateDataType } from "../types/forms";

interface Template {
  name: string;
  renderHtml: (data: TemplateDataType) => Promise<string>;
  thumbnail: any; // TYPE: Maybe a Number pointing to the image
}

export const templates = [
    {
        name: "Basic",
        renderHtml: BasicTemplate,
        thumbnail: BasicTemplateThumbnail,
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