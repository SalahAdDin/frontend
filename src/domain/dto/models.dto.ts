import type { IFile } from "./common.dto";
import type {
  IExperience,
  IPersonalInformation,
  IRichText,
} from "./content.dto";
import type { ISkill, ISocialLink } from "./fields.dto";

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  projects?: IProject[];
  description?: string;
}

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

export interface IProject {
  id: string;
  title?: string;
  thumbnail: IFile;
  video?: IFile;
  links?: ISocialLink[];
  category?: ICategory;
  tags?: ITag[];
  description?: string;
  content?: string;
}

export interface ITag {
  id: string;
  label: string;
  slug: string;
  projects?: IProject[];
  pages?: IPage[];
}
