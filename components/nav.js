import React from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import Link from "next/link"
import {
  AppBar,
  Box,
  Container,
  FormControl,
  MenuItem,
  Select,
  Slide,
  Toolbar,
  useScrollTrigger,
  makeStyles,
  darken,
  fade,
  IconButton,
  Fade,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import { useRouter } from "next/router"
import { menuLinks } from "lib/constants"
import { useTranslation } from "../i18n"

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    // transition: "all 0.5s ease-in-out",
    boxShadow: `0 0 10px 0 ${fade("#000000", 0.06)}`,
    "& .MuiListItem-root": {
      color: darken(theme.palette.muted.main, 0.1),
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
  boxShadow: { boxShadow: `0 0 10px 0 ${fade("#000000", 0.06)}` },
  input: {
    fontSize: 16,
    padding: "6px 1rem",
    color: darken("#9b9bae", 0.06),
  },
  hide: {
    display: "none !important",
  },
  menuButton: {
    color: darken("#9b9bae", 0.06),
    "&:hover": {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.up(770)]: { display: "none" },
    [theme.breakpoints.down(770)]: { alignSelf: "baseline", marginTop: 8 },
  },
  option: {
    fontSize: 16,
    color: darken("#9b9bae", 0.06),
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
}))

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
}

const Nav = ({ navLinks }) => {
  const classes = useStyles()
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  const localizedTitle = (label) => {
    const { title = {}, title_en: titleEn } = navLinks.find(
      (item) => item.slug === label
    )

    return (
      title[
        Object.keys(title).find((content) => content.split("_")[1] === i18n.language)
      ] || titleEn
    )
  }

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value)
  }

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
                    style={{ color: router.pathname === "/" && "#5e62ff" }}
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
                        style={{ color: router.pathname === href && "#5e62ff" }}
                      >
                        {localizedTitle(label)}
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
                      getContentAnchorEl: null,
                      elevation: 0,
                      classes: { paper: classes.boxShadow },
                    }}
                  >
                    <MenuItem disableRipple value="en" className={classes.option}>
                      EN
                    </MenuItem>
                    <MenuItem disableRipple value="tr" className={classes.option}>
                      TR
                    </MenuItem>
                    <MenuItem disableRipple value="es" className={classes.option}>
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
  )
}

Nav.propTypes = {
  navLinks: PropTypes.arrayOf(PropTypes.object),
}

export default Nav
