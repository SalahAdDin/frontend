import {
  alpha,
  Container,
  Grid,
  Link as LinkUI,
  Typography,
} from "@material-ui/core";
import type { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";

import NextIcon from "assets/svg/nextjs.svg";
import StrapiIcon from "assets/svg/strapi-logo-light.svg";
import { footerLinks, socialMediaLinks } from "domain/constants";
import type { IFooterLink, INavLink } from "domain/dto/common.dto";
import URL from "presentation/components/fields/url";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: 60,
    backgroundColor: theme.palette.footerBackGround.default,
    "& a": {
      textDecoration: "none !important",
      outline: "none",
      transition: "all 0.5s",
      color: alpha(theme.palette.light.main, 0.55),
    },
    "& a:hover": {
      color: `${theme.palette.light.main} !important`,
    },
  },
  title: {
    color: theme.palette.light.main,
  },
  alt: {
    color: alpha(theme.palette.light.main, 0.55),
    "& span": { margin: "16px 0" },
  },
  socialMediaIcons: {
    color: alpha(theme.palette.light.main, 0.55),
    transition: "all 0.3s",
    "& svg path": {
      fill: alpha(theme.palette.light.main, 0.55),
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
      "& path": { fill: alpha(theme.palette.light.main, 0.55) },
    },
  },
}));

const Copyright: React.FC = () => {
  return (
    <Typography component="span">
      {`Copyright © `}
      <Link href="/" passHref>
        <LinkUI>José Luis Sandoval Alaguna</LinkUI>
      </Link>
      {` ${new Date().getFullYear()}. `}
    </Typography>
  );
};

const DevTech: React.FC = () => {
  const classes = useStyles();
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
      <LinkUI
        href="//strapi.io/"
        target="_blank"
        rel="noopener"
        aria-label="Strapi"
      >
        <StrapiIcon />
      </LinkUI>
      .
    </Typography>
  );
};

interface NavProps {
  navLinks: [INavLink];
}

const FooterSection: React.FC<IFooterLink & NavProps> = ({
  title,
  links,
  navLinks,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

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
                  ? label
                  : t(label)}
              </LinkUI>
            </Link>
          </li>
        ))}
      </ul>
    </Grid>
  );
};

const Footer: React.FC<NavProps> = ({ navLinks }) => {
  const classes = useStyles();

  return (
    <Container component="footer" className={classes.root} maxWidth={false}>
      <Container maxWidth="md">
        <Grid container justifyContent="space-between">
          <Grid
            item
            xs={12}
            sm={4}
            component="ul"
            className={classes.socialMediaIcons}
          >
            {/* TODO: Add logo here */}
            {socialMediaLinks.map((link) => (
              <URL key={link.id} {...link} />
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
          justifyContent="space-between"
          className={classes.alt}
        >
          <Copyright />
          <DevTech />
        </Grid>
      </Container>
    </Container>
  );
};

export default Footer;
