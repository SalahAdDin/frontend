export interface IBaseMenuLink {
  href: string;
  label: string;
}

export interface ISocialLink {
  type: "Github" | "LinkedIn" | "StackOverflow";
  url: string;
}

export interface IFooterLink {
  title: string;
  links: IBaseMenuLink[];
}

export interface IMenuLink extends IBaseMenuLink {
  key: string;
}
