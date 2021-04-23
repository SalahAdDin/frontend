import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import { PhoneAndroid, Phonelink, Phone } from "@material-ui/icons";
import useStyles from "styles/common";

const Telephone = ({ type, number }) => {
  const classes = useStyles();

  return (
    <li className={classes.telephone}>
      {
        {
          Mobile: <PhoneAndroid style={{ width: "1rem" }} />,
          Home: <Phone style={{ width: "1rem" }} />,
          Work: <Phonelink style={{ width: "1rem" }} />,
        }[type]
      }
      <Typography component="span" variant="subtitle1">
        {number}
      </Typography>
    </li>
  );
};

Telephone.propTypes = {
  type: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

export default Telephone;
