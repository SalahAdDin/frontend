import { ICategory } from "./category.dto";
import { IFile, ISocialLink, ITag } from "./common.dto";

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
