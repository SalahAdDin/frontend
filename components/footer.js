import PropTypes from "prop-types"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { Container, Grid, Typography, makeStyles, fade } from "@material-ui/core"
import { footer_links, social_links } from "@/lib/constants"
import URL from "./fields/url"
import NextIcon from "@/assets/svg/nextjs.svg"
import StrapiIcon from "@/assets/svg/strapi-logo-light.svg"

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 60,
    backgroundColor: theme.palette.footerBackGround.default,
    "& a": {
      textDecoration: "none !important",
      outline: "none",
      transition: "all 0.5s",
      color: fade(theme.palette.light.main, 0.5),
    },
    "& a:hover": {
      color: `${theme.palette.light.main} !important`,
    },
  },
  title: {
    color: theme.palette.light.main,
  },
  alt: {
    color: fade(theme.palette.light.main, 0.5),
    "& span": { margin: "16px 0" },
  },
  socialMediaIcons: {
    color: fade(theme.palette.light.main, 0.5),
    transition: "all 0.3s",
    "& svg path": {
      fill: fade(theme.palette.light.main, 0.5),
    },
    "& svg:hover path": { fill: theme.palette.light.main },
    [theme.breakpoints.down("sm")]: {
      marginBottom: 16,
      textAlign: "center",
      padding: "inherit",
    },
  },
  subMenu: {
    listStyle: "none",
    paddingLeft: 0,
    "& li": {
      padding: "8px 0",
    },
  },
  techIcons: {
    "& svg": { height: 24, margin: "0 8px", marginBottom: -6 },
    "& svg:first-child": {
      "& path": { fill: fade(theme.palette.light.main, 0.5) },
    },
  },
}))

const Copyright = () => {
  return (
    <Typography component="span">
      Copyright ©{" "}
      <Link href="/">
        <a>José Luis Sandoval Alaguna</a>
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  )
}

const DevTech = () => {
  const classes = useStyles()
  return (
    <Typography component="span" className={classes.techIcons}>
      Developed with{" "}
      <Link href={`//nextjs.org/`} passHref>
        <a>
          <NextIcon />
        </a>
      </Link>{" "}
      &nbsp;&amp;&nbsp;{" "}
      <Link href={`//strapi.io/`} passHref>
        <a>
          <StrapiIcon />
        </a>
      </Link>
      .
    </Typography>
  )
}

const FooterSection = ({ title, links, navLinks }) => {
  const classes = useStyles()
  const { t, i18n } = useTranslation()

  const localizedTitle = (label) => {
    const { title = {}, title_en } = navLinks.find((item) => item.slug == label)

    return (
      title[
        Object.keys(title).find((content) => content.split("_")[1] == i18n.language)
      ] || title_en
    )
  }

  return (
    // TODO: Improve styles as a correct menu as in templates
    <Grid item xs={12} sm={2}>
      <Typography variant="h6" component="h6" className={classes.title}>
        {t(title)}
      </Typography>
      <ul className={classes.subMenu}>
        {links.map(({ href, label }) => (
          <li key={"item_" + label}>
            <Link href={href}>
              <a>
                {navLinks.find((item) => item.slug == label) !== void 0
                  ? localizedTitle(label)
                  : t(label)}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Grid>
  )
}

FooterSection.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  navLinks: PropTypes.arrayOf(PropTypes.object),
}

const Footer = ({ navLinks }) => {
  const classes = useStyles()
  return (
    <Container component="footer" className={classes.root} maxWidth={false}>
      <Container maxWidth="md">
        <Grid container justify="space-between">
          <Grid
            item
            xs={12}
            sm={4}
            component="ul"
            className={classes.socialMediaIcons}
          >
            {/* TODO: Add icon here */}
            {social_links.map((link) => (
              <URL key={"footer_" + link.type} {...link} minimize />
            ))}
          </Grid>
          {footer_links.map((section) => (
            <FooterSection
              key={"section_" + section.title}
              {...section}
              navLinks={navLinks}
            />
          ))}
        </Grid>
        <Grid
          container
          alignItems="center"
          justify="space-between"
          className={classes.alt}
        >
          <Copyright />
          <DevTech />
        </Grid>
      </Container>
    </Container>
  )
}

Footer.propTypes = {
  navLinks: PropTypes.arrayOf(PropTypes.object),
}

export default Footer
