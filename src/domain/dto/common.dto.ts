export interface IBaseMenuLink {
  href: string;
  label: string;
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

export interface IFile {
  id: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: { [key: string]: any };
  hash: string;
  ext?: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: { [key: string]: any };
  related?: any[];
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
