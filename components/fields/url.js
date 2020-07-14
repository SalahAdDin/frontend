import PropTypes from "prop-types"
import Link from "next/link"
import { ListItemIcon, ListItem } from "@material-ui/core"
import { GitHub, InsertLink, LinkedIn } from "@material-ui/icons"
import useStyles from "@/styles/common"
// TODO: Get Icons for StackOverflow, BitBucket and GitLab

const URL = ({ link }) => {
  const classes = useStyles()
  const { type, url } = link
  return (
    <ListItem className={classes.inlineBlock}>
      <Link href={"//" + url}>
        <a>
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
      </Link>
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
