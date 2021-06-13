import { IFile } from "./common.dto";
import { IExperience, IPersonalInformation, IRichText } from "./content.dto";
import { ISkill } from "./fields.dto";
import { ITag } from "./tag.dto";

export interface IPage {
  id: string;
  title?: string;
  slug: string;
  thumbnail?: IFile;
  body: (
    | ({ __component: "content.rich-text" } & IRichText)
    | ({ __component: "content.experience" } & IExperience)
    | ({ __component: "content.personal-information" } & IPersonalInformation)
    | ({ __component: "fields.skill" } & ISkill)
  )[]; // IComponent[]
  tags?: ITag[];
  description?: string;
}
