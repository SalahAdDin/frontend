import PropTypes from "prop-types"
import { ListItemIcon, ListItem } from "@material-ui/core"
import { GitHub, InsertLink, LinkedIn } from "@material-ui/icons"
import useStyles from "@/styles/common"
// TODO: Get Icons for StackOverflow, BitBucket and GitLab

const URL = ({ link }) => {
  const classes = useStyles()
  const { type, url } = link
  return (
    <ListItem className={classes.inlineBlock}>
      <a href={url}>
        <ListItemIcon>
          {
            {
              Github: <GitHub />,
              BitBucket: <InsertLink />,
              GitLab: <InsertLink />,
              StackOverflow: <InsertLink />,
              LinkedIn: <LinkedIn />,
            }[type]
          }
        </ListItemIcon>
      </a>
    </ListItem>
  )
}

URL.propTypes = {
  link: PropTypes.shape({
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
}

export default URL
