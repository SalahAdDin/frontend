import {
  alpha,
  AppBar,
  Box,
  Container,
  darken,
  Fade,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Slide,
  Toolbar,
  useScrollTrigger,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { menuLinks } from "domain/constants";
import { INavLink } from "domain/dto/common.dto";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import React, { useState } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.background.default,
    // transition: "all 0.5s ease-in-out",
    boxShadow: `0 0 10px 0 ${alpha("#000000", 0.06)}`,
    "& .MuiListItem-root": {
      color: darken(theme.palette.muted.main, 0.25),
      fontWeight: 600,
      transition: "all 0.3s",
    },
    "& .MuiListItem-root:hover": {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
    },
    "& .MuiMenuItem-root": {
      fontSize: 16,
    },
    "& .MuiSelect-icon": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.down(770)]: {
      position: "static",
    },
  },
  activeItem: { color: `${theme.palette.primary.main} !important` },
  boxShadow: { boxShadow: `0 0 10px 0 ${alpha("#000000", 0.06)}` },
  input: {
    fontSize: 16,
    padding: "6px 1rem",
    color: darken(theme.palette.muted.main, 0.06),
  },
  hide: {
    display: "none !important",
  },
  menuButton: {
    color: darken(theme.palette.muted.main, 0.06),
    "&:hover": {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.up(770)]: { display: "none" },
    [theme.breakpoints.down(770)]: { alignSelf: "baseline", marginTop: 8 },
  },
  option: {
    fontSize: 16,
    color: darken(theme.palette.muted.main, 0.06),
  },
  navbar: {
    [theme.breakpoints.down(770)]: {
      display: "grid",
      // transition: "all 0.5s ease-in-out",
    },
    [theme.breakpoints.up(770)]: {
      display: "flex !important",
      //  Using Face component force us to put next
      opacity: "inherit !important",
      visibility: "inherit !important",
    },
  },
  toolbar: {
    [theme.breakpoints.down(770)]: {
      justifyContent: "flex-end",
    },
  },
}));

interface HideOnScrollProps {
  children: JSX.Element;
}

const HideOnScroll: React.FC<HideOnScrollProps> = ({ children }) => {
  const trigger: boolean = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

interface NavProps {
  navLinks: [INavLink];
}

const Nav: React.FC<NavProps> = ({ navLinks }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const router: NextRouter = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleLanguageChange = (event: { target: { value: any } }) => {
    router.push(router.pathname, router.asPath, { locale: event.target.value });
  };

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        color="default"
        className={classes.root}
        elevation={0}
      >
        <Container component="nav" maxWidth="md" disableGutters>
          <Toolbar className={classes.toolbar}>
            {/* TODO: Add custom logo here */}
            <Fade in={open} timeout={500}>
              <Box
                id="main-menu"
                display="flex"
                component="ul"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                role="tablist"
                className={clsx(classes.navbar, open ? null : classes.hide)}
              >
                <Link href="/" passHref>
                  <MenuItem
                    role="tab"
                    disableRipple
                    className={
                      router.pathname === "/" ? classes.activeItem : ""
                    }
                    onClick={() => setOpen(!open)}
                  >
                    {t("home")}
                  </MenuItem>
                </Link>
                {navLinks &&
                  Object.keys(navLinks).length !== 0 &&
                  menuLinks.map(({ key, href, label }) => (
                    <Link href={href} key={key} passHref>
                      <MenuItem
                        role="tab"
                        disableRipple
                        className={
                          router.pathname === href ? classes.activeItem : ""
                        }
                        onClick={() => setOpen(!open)}
                      >
                        {label}
                      </MenuItem>
                    </Link>
                  ))}
                <FormControl component="li" role="tab">
                  <Select
                    // native
                    value={i18n.language}
                    onChange={handleLanguageChange}
                    inputProps={{ classes: { root: classes.input } }}
                    variant="outlined"
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "center",
                      },
                      anchorEl: null,
                      elevation: 0,
                      classes: { paper: classes.boxShadow },
                    }}
                  >
                    <MenuItem
                      disableRipple
                      value="en"
                      className={classes.option}
                    >
                      EN
                    </MenuItem>
                    <MenuItem
                      disableRipple
                      value="tr"
                      className={classes.option}
                    >
                      TR
                    </MenuItem>
                    <MenuItem
                      disableRipple
                      value="es"
                      className={classes.option}
                    >
                      ES
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Fade>
            <IconButton
              aria-label="open menu"
              onClick={() => setOpen(!open)}
              edge="end"
              classes={{ root: classes.menuButton }}
              disableRipple
              disableFocusRipple
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Nav;
