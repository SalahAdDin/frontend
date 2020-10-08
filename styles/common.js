import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  inlineBlock: { width: "inherit", display: "inline-block" },
  inlineSmallIcon: {
    width: "1.125rem",
    verticalAlign: "middle",
    margin: "auto 0.5rem",
  },
  tagsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
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
    textAlign: "center",
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
}))

export default useStyles
