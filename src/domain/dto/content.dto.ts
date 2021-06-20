import type { IFile } from "./common.dto";
import type { IAddress, ISkill, ISocialLink, ITelephone } from "./fields.dto";

export interface IExperience {
  id: string;
  from: Date;
  to?: Date;
  ongoing?: boolean;
  title: string;
  institution: string;
  address?: IAddress;
  url?: string;
  description?: string;
}

export interface IPersonalInformation {
  id: string;
  name: string;
  photo: IFile;
  position: string;
  nationality?: string;
  address?: IAddress;
  telephone?: ITelephone[];
  mail: string;
  links?: ISocialLink[];
  aboutMe?: string;
}

export interface IRichText {
  id: string;
  text: string;
}

export type IComponent =
  | ({
      __component: "content.rich-text";
      __typename: "ComponentContentRichText";
    } & IRichText)
  | ({
      __component: "content.experience";
      __typename: "ComponentContentExperience";
    } & IExperience)
  | ({
      __component: "content.personal-information";
      __typename: "ComponentContentPersonalInformation";
    } & IPersonalInformation)
  | ({
      __component: "fields.skill";
      __typename: "ComponentFieldsSkill";
    } & ISkill);
