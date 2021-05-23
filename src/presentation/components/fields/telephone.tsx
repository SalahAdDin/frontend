import { Typography } from "@material-ui/core";
import { Phone, PhoneAndroid, Phonelink } from "@material-ui/icons";
import { ITelephone } from "domain/dto/common.dto";
import useStyles from "presentation/styles/common";
import React from "react";

const Telephone: React.FC<ITelephone> = ({ type, number }) => {
  const { telephone } = useStyles();
  return (
    <li className={telephone}>
      {
        {
          Mobile: <PhoneAndroid style={{ width: "1em" }} />,
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

export default Telephone;
