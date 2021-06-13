import { IProject } from "./project.dto";

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  projects?: IProject[];
  description?: string;
}
