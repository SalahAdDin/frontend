import PropTypes from "prop-types";
import { Rating } from "@material-ui/lab";
import { Typography } from "@material-ui/core";

const Skill = ({ name, level }) => {
  return (
    <>
      <Typography component="legend">{name}</Typography>
      <Rating name={name} value={level} precision={0.5} readOnly />
    </>
  );
};

Skill.defaultProps = { name: "Skill", level: 3 };

Skill.propTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
};

export default Skill;
