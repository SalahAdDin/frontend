export const EXAMPLE_PATH = "cms-strapi"
export const CMS_NAME = "Uzmani Tech"
export const CMS_AUTHOR = "José Luis Sandoval Alaguna"
export const CMS_URL = "uzmani.tech"
export const CMS_TILE_COLOR = "#000000"
export const CMS_THEME_COLOR = "#000000"
// TODO: Change next
export const HOME_OG_IMAGE_URL =
  "https://og-image.now.sh/Next.js%20Blog%20Example%20with%20**Strapi**.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1590740734%2Fnextjs%2Fexamples%2Fstrapi-logo.svg"

export const menuLinks = [
  { href: "/projects", label: "projects" },
  { href: "/work-experience", label: "work-experience" },
  { href: "/education", label: "education" },
  { href: "/about-me", label: "about-me" },
  { href: "/posts", label: "posts" },
].map((link) => {
  link.key = `nav-${link.label}`
  return link
})

export const footerLinks = [
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
]

export const socialMediaLinks = [
  { type: "Github", url: "www.github.com/SalahAdDin" },
  { type: "LinkedIn", url: "www.linkedin.com/in/jluissalaguna/" },
  { type: "StackOverflow", url: "stackoverflow.com/users/801/salahaddin" },
]
