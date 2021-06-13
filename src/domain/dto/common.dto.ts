export interface IBaseMenuLink {
  href: string;
  label: string;
}

export interface ISocialLink {
  id: number;
  type:
    | "Home"
    | "Github"
    | "BitBucket"
    | "GitLab"
    | "StackOverflow"
    | "LinkedIn";
  url: string;
}

export interface IMenuLink extends IBaseMenuLink {
  key: string;
}

export interface INavLink {
  slug: string;
  title: string;
}

export interface IFooterLink {
  title: string;
  links: IBaseMenuLink[];
}

export interface IAddress {
  address?: string;
  city: string;
  country: string;
  postalCode?: number;
}

export interface IVideo {
  alternativeText: string;
  caption: string;
  url: string;
  name: string;
  previewUrl: string;
  updatedAt: Date;
}

export interface IImage {
  alternativeText: string;
  caption: string;
  url: string;
  width: number;
  height: number;
}

export interface ISkill {
  type:
    | "Database"
    | "Framework"
    | "Language"
    | "Operating_System"
    | "Programming_Language"
    | "Technical"
    | "Technology"
    | "Tools";
  id: number;
  name: string;
  level: number;
}

export interface ITag {
  id: number;
  label: string;
  slug: string;
}

export interface ITelephone {
  id: number;
  type: "Mobile" | "Home" | "Work";
  number: number;
}

}
