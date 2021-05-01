import {
  IBaseMenuLink,
  IFooterLink,
  IMenuLink,
  ISocialLink,
} from "domain/dto/common.dto";

export const EXAMPLE_PATH: string = "cms-strapi";
export const CMS_NAME: string = "Uzmani Tech";
export const CMS_AUTHOR: string = "José Luis Sandoval Alaguna";
export const CMS_URL: string = "uzmani.tech";
export const CMS_TILE_COLOR: string = "#5D61FD";
export const CMS_THEME_COLOR: string = "#FFFFFF";
export const DISQUS_SHORT_NAME: string = "uzmani-tech";
// TODO: Change next
export const HOME_OG_IMAGE_URL: string =
  "https://og-image.now.sh/Next.js%20Blog%20Example%20with%20**Strapi**.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1590740734%2Fnextjs%2Fexamples%2Fstrapi-logo.svg";

export const menuLinks: IMenuLink[] = [
  { href: "/projects", label: "projects" },
  { href: "/work-experience", label: "work-experience" },
  { href: "/education", label: "education" },
  { href: "/about-me", label: "about-me" },
  { href: "/posts", label: "posts" },
].map((link: IBaseMenuLink) => {
  const key = `nav-${link.label}`;
  return { ...link, key };
});

export const footerLinks: IFooterLink[] = [
  {
    title: "main",
    links: [{ href: "/", label: "home" }],
  },
  {
    title: "resources",
    links: [
      {
        href: "/projects",
        label: "projects",
      },
      {
        href: "/posts",
        label: "posts",
      },
    ],
  },
  {
    title: "me",
    links: [
      { href: "/about-me", label: "about-me" },
      { href: "/work-experience", label: "work-experience" },
      { href: "/education", label: "education" },
    ],
  },
];

export const socialMediaLinks: ISocialLink[] = [
  { type: "Github", url: "www.github.com/SalahAdDin" },
  { type: "LinkedIn", url: "www.linkedin.com/in/jluissalaguna/" },
  { type: "StackOverflow", url: "stackoverflow.com/users/3826549/salahaddin" },
];
