import { IAddress } from "./common.dto";

export interface IExperience {
  address: IAddress;
  description: string;
  from: string;
  institution: string;
  ongoing: boolean;
  title: string;
  to?: string;
  url?: string;
}
