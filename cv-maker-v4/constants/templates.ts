import BasicTemplate from "../assets/templates/BasicTemplate";
import ModernTemplate from "../assets/templates/ModernTemplate";
import FuncTemplate from "../assets/templates/FuncTemplate";
import GridTemplate from "../assets/templates/GridTemplate";

import BasicTemplateThumbnail from "../assets/images/templates/BasicTemplate.jpeg";
import ModernTemplateThumbnail from "../assets/images/templates/ModernTemplate.jpeg";
import FuncTemplateThumbnail from "../assets/images/templates/FuncTemplate.jpg";
import GridTemplateThumbnail from "../assets/images/templates/GridTemplate.jpeg";

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
        name: "XYZ",
        renderHtml: FuncTemplate,
        thumbnail: FuncTemplateThumbnail
    },
    {
        name: "Grid",
        renderHtml: GridTemplate,
        thumbnail: GridTemplateThumbnail
    }
] as Template[];