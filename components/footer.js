import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import {
  Container,
  Grid,
  Link,
  Typography,
  makeStyles,
  fade,
} from "@material-ui/core"
import { footerLinks, socialMediaLinks } from "lib/constants"
import NextIcon from "assets/svg/nextjs.svg"
import StrapiIcon from "assets/svg/strapi-logo-light.svg"
import URL from "./fields/url"

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
    [theme.breakpoints.down(600)]: {
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
      Copyright © <Link href="/">José Luis Sandoval Alaguna</Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  )
}

const DevTech = () => {
  const classes = useStyles()
  return (
    <Typography component="span" className={classes.techIcons}>
      Developed with{" "}
      <Link href="//nextjs.org/" target="_blank" rel="noopener" aria-label="NextJS">
        <NextIcon />
      </Link>{" "}
      &nbsp;&amp;&nbsp;{" "}
      <Link href="//strapi.io/" target="_blank" rel="noopener" aria-label="Strapi">
        <StrapiIcon />
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
    <Grid item xs={6} sm={2}>
      <Typography variant="h6" component="h6" className={classes.title}>
        {t(title)}
      </Typography>
      <ul className={classes.subMenu}>
        {links.map(({ href, label }) => (
          <li key={`item_${label}`}>
            <Link href={href}>
              {navLinks.find((item) => item.slug == label) !== void 0
                ? localizedTitle(label)
                : t(label)}
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
            {/* TODO: Add logo here */}
            {socialMediaLinks.map((link) => (
              <URL key={`footer_${link.type}`} {...link} minimize />
            ))}
          </Grid>
          {footerLinks.map((section) => (
            <FooterSection
              key={`section_${section.title}`}
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
