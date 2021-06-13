import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(({ spacing, palette, breakpoints }: Theme) => ({
  avatarHeader: {
    "& .MuiCardHeader-avatar": {
      overflow: "hidden",
      display: "flex",
      width: spacing(30),
      height: spacing(30),
      borderRadius: "50%",
    },
    [breakpoints.down(660)]: {
      display: "block !important",
      "& .MuiCardHeader-avatar": { marginRight: 0, marginBottom: 24 },
    },
  },
  centeredImage: { display: "flex", justifyContent: "center" },
  dynamicZone: { wordBreak: "break-word", "& a": { textDecoration: "none" } },
  errorPage: {
    marginTop: 180,
    marginBottom: 200,
    height: "35vh",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& h1": {
      fontSize: "2.5rem",
      fontFamily: `"DM Sans",sans-serif`,
      fontWeight: 500,
      lineHeight: 1.2,
      color: palette.dark.main,
    },
    "& p": {
      color: palette.muted.main,
      lineHeight: 1.8,
      marginBottom: 24,
    },
    "& a": { borderRadius: "50rem", textTransform: "none" },
    "@media screen and (min-height: 1050px)": {
      height: "50vh",
    },
  },
  experience: {
    "& a": { textDecoration: "none" },
    "& .timeline-flag": {
      marginTop: "-2rem",
      [breakpoints.down(720)]: {
        textAlign: "left",
        marginTop: "inherit",
      },
    },
    "& .timeline-content": {
      marginTop: "-3.5rem",
      marginBottom: "1rem",
      [breakpoints.down(720)]: {
        padding: "inherit",
        marginTop: "inherit",
      },
    },
    [breakpoints.down(720)]: {
      display: "list-item",
      "& .MuiTimelineSeparator-root": {
        display: "none",
      },
    },
  },
  inlineSmallIcon: {
    width: "1.125rem",
    verticalAlign: "middle",
    margin: "auto 0.5rem",
  },
  heroImage: {
    marginBottom: 48,
  },
  noPadding: {
    margin: 0,
    padding: 0,
  },
  tagsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 48,
    "& > div, hr, a": {
      margin: spacing(1),
    },
  },
  telephone: {
    width: "inherit",
    display: "inline-block",
    marginLeft: 8,
    marginRight: 8,
    "& svg": { verticalAlign: "text-bottom", marginRight: 4 },
  },
  title: { marginBottom: 24, wordBreak: "break-word" },
  url: {
    width: "inherit",
    display: "inline-block",
    marginLeft: 16,
    marginRight: 16,
  },
}));

export default useStyles;
