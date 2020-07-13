import PropTypes from "prop-types"
import { makeStyles, ListItemText, ListItemIcon, ListItem } from "@material-ui/core"
import { PhoneAndroid, Phonelink, Phone } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
  inlineBlock: { width: "inherit", display: "inline-block" },
}))

const Telephone = ({ phone }) => {
  const classes = useStyles()
  const { type, number } = phone
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
  phone: PropTypes.shape({
    type: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }),
}

export default Telephone
