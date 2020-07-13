import PropTypes from "prop-types"
import { Rating } from "@material-ui/lab"
import { Box, Typography, Grid } from "@material-ui/core"

const Skill = ({ name, level }) => {
  return (
    <Grid container item xs={12} md={6}>
      <Grid item xs={12} md={4}>
        <Typography component="legend">{name}</Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Rating name={name} value={level} precision={0.5} readOnly></Rating>
      </Grid>
    </Grid>
  )
}

Skill.propTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
}

export default Skill
