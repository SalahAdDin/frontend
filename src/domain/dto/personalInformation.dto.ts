import { IAddress, IImage, ISocialLink, ITelephone } from "./common.dto";

export interface IPersonalInformation {
  name: string;
  photo?: IImage;
  position?: string;
  mail?: string;
  nationality?: string;
  address: IAddress;
  links: ISocialLink[];
  telephone: ITelephone[];
  aboutMe: string;
}
