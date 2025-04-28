import { BasicTemplate } from "../assets/templates/BasicTemplate";
import { ModernTemplate } from "../assets/templates/ModernTemplate";

import BasicTemplateThumbnail from "../assets/images/templates/BasicTemplate.png";
import ModernTemplateThumbnail from "../assets/images/templates/ModernTemplate.jpg";

export const templates = [
    {
        name: "Basic",
        html: BasicTemplate,
        thumbnail: BasicTemplateThumbnail
    },
    {
        name: "Modern",
        html: ModernTemplate,
        thumbnail: ModernTemplateThumbnail
    }
]