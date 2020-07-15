import PropTypes from "prop-types"
import { ListItemText, ListItemIcon, ListItem } from "@material-ui/core"
import { PhoneAndroid, Phonelink, Phone } from "@material-ui/icons"
import useStyles from "@/styles/common"

const Telephone = ({ type, number }) => {
  const classes = useStyles()

  return (
    <ListItem className={classes.inlineBlock}>
      <ListItemIcon className={classes.inlineBlock} style={{ minWidth: "1.125rem" }}>
        {
          {
            Mobile: <PhoneAndroid style={{ width: "1rem" }} />,
            Home: <Phone style={{ width: "1rem" }} />,
            Work: <Phonelink style={{ width: "1rem" }} />,
          }[type]
        }
      </ListItemIcon>
      <ListItemText
        primary={number}
        style={{ display: "inline-block", verticalAlign: "bottom" }}
      />
    </ListItem>
  )
}

Telephone.propTypes = {
  type: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
}

export default Telephone
