import PropTypes from "prop-types"
import { Grid, Typography } from "@material-ui/core"
import Project from "./project"

const Category = ({ name, projects }) => {
  return (
    <>
      <Typography variant="h4" component="h4">
        {name}
      </Typography>
      <Grid container component="section" spacing={2}>
        {projects.map((project) => (
          <Project key={"project_" + project.id} {...project} />
        ))}
      </Grid>
    </>
  )
}

Category.propTypes = {
  name: PropTypes.string.isRequired,
  projects: PropTypes.array,
}

export default Category
