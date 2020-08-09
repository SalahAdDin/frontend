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
}))

export default useStyles
