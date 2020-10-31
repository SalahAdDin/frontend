import PropTypes from "prop-types"
import { Rating } from "@material-ui/lab"
import { Typography, Grid } from "@material-ui/core"

const Skill = ({ name, level }) => {
  return (
    <Grid
      container
      item
      xs={12}
      sm={6}
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <Typography component="legend">{name}</Typography>
      <Rating name={name} value={level} precision={0.5} readOnly />
    </Grid>
  )
}

Skill.defaultProps = { name: "Skill", level: 3 }

Skill.propTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
}

export default Skill
