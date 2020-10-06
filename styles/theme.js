import { createMuiTheme, responsiveFontSizes } from "@material-ui/core"

const baseTheme = createMuiTheme({
  palette: {
    primary: { main: "#5e62ff" },
    secondary: { main: "#5e62ff" },
    success: { main: "#2dd6b7" },
    info: { main: "#56c6e6" },
    warning: { main: "#ffbb13" },
    error: { main: "#f43958" },
    dark: { main: "#343a40" },
    muted: { main: "#9b9bae" },
    light: { main: "#fbfbfb" },
    background: { default: "#fff" },
    backgroundCounter: { default: "#5e62ff" },
    footerBackGround: { default: "#343a40" },
  },
  typography: {
    fontFamily: ["Nunito", "sans-serif"],
    fontSize: 16,
  },
})

const theme = responsiveFontSizes(baseTheme)

export default theme
