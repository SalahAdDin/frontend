import PropTypes from "prop-types"
import Link from "next/link"
import {
  Container,
  Grid,
  Link as LinkUI,
  Typography,
  makeStyles,
  fade,
} from "@material-ui/core"
import NextIcon from "assets/svg/nextjs.svg"
import StrapiIcon from "assets/svg/strapi-logo-light.svg"
import { footerLinks, socialMediaLinks } from "lib/constants"
import URL from "./fields/url"
import { useTranslation } from "../i18n"

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 60,
    backgroundColor: theme.palette.footerBackGround.default,
    "& a": {
      textDecoration: "none !important",
      outline: "none",
      transition: "all 0.5s",
      color: fade(theme.palette.light.main, 0.55),
    },
    "& a:hover": {
      color: `${theme.palette.light.main} !important`,
    },
  },
  title: {
    color: theme.palette.light.main,
  },
  alt: {
    color: fade(theme.palette.light.main, 0.55),
    "& span": { margin: "16px 0" },
  },
  socialMediaIcons: {
    color: fade(theme.palette.light.main, 0.55),
    transition: "all 0.3s",
    "& svg path": {
      fill: fade(theme.palette.light.main, 0.55),
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
      "& path": { fill: fade(theme.palette.light.main, 0.55) },
    },
  },
}))

const Copyright = () => {
  return (
    <Typography component="span">
      {`Copyright © `}
      <Link href="/" passHref>
        <LinkUI>José Luis Sandoval Alaguna</LinkUI>
      </Link>
      {` ${new Date().getFullYear()}. `}
    </Typography>
  )
}

const DevTech = () => {
  const classes = useStyles()
  return (
    <Typography component="span" className={classes.techIcons}>
      {`Developed with `}
      <LinkUI
        href="//nextjs.org/"
        target="_blank"
        rel="noopener"
        aria-label="NextJS"
      >
        <NextIcon />
      </LinkUI>
      &nbsp;&amp;&nbsp;
      <LinkUI href="//strapi.io/" target="_blank" rel="noopener" aria-label="Strapi">
        <StrapiIcon />
      </LinkUI>
      .
    </Typography>
  )
}

const FooterSection = ({ title, links, navLinks }) => {
  const classes = useStyles()
  const { t, i18n } = useTranslation()

  const localizedTitle = (label) => {
    const { title: localTitle, title_en: titleEn } = navLinks.find(
      (item) => item.slug === label
    )

    return (
      localTitle[
        Object.keys(localTitle).find(
          (content) => content.split("_")[1] === i18n.language
        )
      ] || titleEn
    )
  }

  return (
    <Grid item xs={6} sm={2}>
      <Typography variant="h6" component="h1" className={classes.title}>
        {t(title)}
      </Typography>
      <ul className={classes.subMenu}>
        {links.map(({ href, label }) => (
          <li key={`item_${label}`}>
            <Link href={href} passHref>
              <LinkUI>
                {navLinks.find((item) => item.slug === label) !== undefined
                  ? localizedTitle(label)
                  : t(label)}
              </LinkUI>
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
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title_en: PropTypes.string.isRequired,
      title: PropTypes.objectOf(PropTypes.string),
    })
  ),
}

export default Footer
