import { IPage } from "./page.dto";
import { IProject } from "./project.dto";

export interface ITag {
  id: string;
  label: string;
  slug: string;
  projects?: IProject[];
  pages?: IPage[];
}
