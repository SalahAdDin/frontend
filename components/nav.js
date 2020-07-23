import PropTypes from "prop-types"
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
} from "@material-ui/core"
import { useTranslation } from "react-i18next"
import { menu_links } from "@/lib/constants"

const useStyles = makeStyles((theme) => ({
  input: {
    padding: "6px 1rem",
  },
}))

const HideOnScroll = ({ children, window }) => {
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

const Nav = ({ navLinks }) => {
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

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value)
  }

  return (
    <HideOnScroll>
      <AppBar position="fixed" color="default" elevation={0}>
        <Container component="nav" maxWidth="md" disableGutters>
          <Toolbar>
            {/* TODO: Add custom logo here */}
            <Box
              id="main-menu"
              display="flex"
              component="ul"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Link href="/" passHref>
                <MenuItem>{t("home")}</MenuItem>
              </Link>
              {navLinks &&
                Object.keys(navLinks).length !== 0 &&
                menu_links.map(({ key, href, label }) => (
                  <Link href={href} key={key} passHref>
                    <MenuItem>{localizedTitle(label)}</MenuItem>
                  </Link>
                ))}
              <FormControl variant="standard" style={{ margin: "auto 1rem" }}>
                <Select
                  value={i18n.language}
                  onChange={handleLanguageChange}
                  disableUnderline
                  inputProps={{ classes: { root: classes.input } }}
                >
                  <MenuItem value="en">EN</MenuItem>
                  <MenuItem value="tr">TR</MenuItem>
                  <MenuItem value="es">ES</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* TODO: Icono hamburguesa aquí */}
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
