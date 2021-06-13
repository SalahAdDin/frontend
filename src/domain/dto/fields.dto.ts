export interface IAddress {
  id: string;
  address?: string;
  city: string;
  country: "Colombia" | "Turkey";
  postalCode?: number;
}

export interface ISkill {
  id: string;
  name: string;
  level: number;
  type:
    | "Database"
    | "Framework"
    | "Language"
    | "Operating_System"
    | "Programming_Language"
    | "Technical"
    | "Technology"
    | "Tools";
}

export interface ISocialLink {
  id: string;
  type:
    | "Home"
    | "Github"
    | "BitBucket"
    | "GitLab"
    | "StackOverflow"
    | "LinkedIn";
  url: string;
}

export interface ITelephone {
  id: string;
  type: "Mobile" | "Home" | "Work";
  number: number;
}
