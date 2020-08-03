import PropTypes from "prop-types"
import { Link, ListItemIcon, ListItem } from "@material-ui/core"
import { GitHub, Home, LinkedIn } from "@material-ui/icons"
import useStyles from "@/styles/common"
import BitBucket from "@/assets/svg/bitbucket.svg"
import GitLab from "@/assets/svg/gitlab.svg"
import StackOverflow from "@/assets/svg/stack-overflow.svg"

const URL = ({ type, url, minimize }) => {
  const classes = useStyles()

  return (
    <ListItem className={classes.inlineBlock}>
      <Link href={url} target="_blank" rel="noreferrer">
        <ListItemIcon style={{ minWidth: minimize ? "inherit" : "" }}>
          {
            {
              Home: <Home />,
              Github: <GitHub />,
              BitBucket: <BitBucket />,
              GitLab: <GitLab />,
              StackOverflow: <StackOverflow />,
              LinkedIn: <LinkedIn />,
            }[type]
          }
        </ListItemIcon>
      </Link>
    </ListItem>
  )
}

URL.propTypes = {
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  minimize: PropTypes.bool,
}

export default URL
