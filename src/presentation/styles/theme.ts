import { createTheme, responsiveFontSizes } from "@material-ui/core";

const baseTheme = createTheme({
  palette: {
    primary: { main: "#5d61fd" },
    secondary: { main: "#6c757d" },
    success: { main: "#2dd6b7" },
    info: { main: "#56c6e6" },
    warning: { main: "#ffbb13" },
    error: { main: "#f43958" },
    dark: { main: "#343a40" },
    muted: { main: "#757583" },
    light: { main: "#fbfbfb" },
    background: { default: "#fff" },
    backgroundCounter: { default: "#5d61fd" },
    footerBackGround: { default: "#343a40" },
  },
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
    fontSize: 16,
  },
});

const theme = responsiveFontSizes(baseTheme);

export default theme;
