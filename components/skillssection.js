import PropTypes from "prop-types"
import { Card, Grid, Typography, CardHeader, CardContent } from "@material-ui/core"
import Skill from "./fields/skill"

const SkillsSection = ({ skills, group }) => {
  return (
    <Card component="section" style={{ margin: "15px auto", padding: 32 }}>
      <CardHeader
        title={
          <Typography variant="h5" component="h5">
            {group.replace("_", " ")}
          </Typography>
        }
      />
      <CardContent>
        <Grid container>
          {skills.map((skill) => (
            <Skill key={skill.id} name={skill.name} level={skill.level} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

SkillsSection.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
    })
  ),
  group: PropTypes.string.isRequired,
}

export default SkillsSection
