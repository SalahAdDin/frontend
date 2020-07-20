import PropTypes from "prop-types"
import Link from "next/link"
import { ListItemIcon, ListItem } from "@material-ui/core"
import { GitHub, InsertLink, LinkedIn } from "@material-ui/icons"
import useStyles from "@/styles/common"
import BitBucket from "@/assets/svg/bitbucket.svg"
import GitLab from "@/assets/svg/gitlab.svg"
import StackOverflow from "@/assets/svg/stack-overflow.svg"

const URL = ({ type, url, minimize }) => {
  const classes = useStyles()

  return (
    <ListItem className={classes.inlineBlock}>
      <Link href={"//" + url}>
        <a target="_blank">
          <ListItemIcon style={{ minWidth: minimize ? "inherit" : "" }}>
            {
              {
                Github: <GitHub />,
                BitBucket: <BitBucket />,
                GitLab: <GitLab />,
                StackOverflow: <StackOverflow />,
                LinkedIn: <LinkedIn />,
              }[type]
            }
          </ListItemIcon>
        </a>
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
