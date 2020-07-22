import PropTypes from "prop-types"
import { Container, Grid, Typography } from "@material-ui/core"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { footer_links, social_links } from "@/lib/constants"
import URL from "./fields/url"

const Copyright = () => {
  return (
    <Typography component="span" color="textSecondary">
      Copyright ©{" "}
      <Link href="/">
        <a>José Luis Sandoval Alaguna</a>
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  )
}

const DevTech = () => {
  return (
    <Typography component="span" color="textSecondary">
      Developed with NextJS &nbsp;&amp;&nbsp; Strapi
    </Typography>
  )
}

const FooterSection = ({ title, links, navLinks }) => {
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
      <Typography variant="h6" component="h6">
        {t(title)}
      </Typography>
      <ul>
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
  return (
    <Container component="footer" maxWidth="md">
      <Grid container justify="space-between">
        <Grid item xs={12} sm={4} component="ul">
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
      <Grid container alignItems="center" justify="space-between">
        <Copyright />
        <DevTech />
      </Grid>
    </Container>
  )
}

Footer.propTypes = {
  navLinks: PropTypes.arrayOf(PropTypes.object),
}

export default Footer
