import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  inlineSmallIcon: {
    width: "1.125rem",
    verticalAlign: "middle",
    margin: "auto 0.5rem",
  },
  tagsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 48,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  heroImage: {
    marginBottom: 48,
  },
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
      color: theme.palette.dark.main,
    },
    "& p": { color: theme.palette.muted.main, lineHeight: 1.8, marginBottom: 24 },
    "& a": { borderRadius: "50rem", textTransform: "none" },
  },
  telephone: {
    width: "inherit",
    display: "inline-block",
    marginLeft: 8,
    marginRight: 8,
    "& svg": { verticalAlign: "text-bottom", marginRight: 4 },
  },
  url: {
    width: "inherit",
    display: "inline-block",
    marginLeft: 16,
    marginRight: 16,
  },
}))

export default useStyles
