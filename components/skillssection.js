import PropTypes from "prop-types"
import { Card, Grid, Typography, CardHeader, CardContent } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import Skill from "./fields/skill"

const SkillsSection = ({ skills, group }) => {
  return (
    <Card component="section" style={{ margin: "15px auto", padding: 32 }}>
      <CardHeader
        title={
          group ? (
            <Typography variant="h5" component="h5">
              {group.replace("_", " ")}
            </Typography>
          ) : (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          )
        }
      />
      <CardContent>
        <Grid container spacing={4}>
          {skills ? (
            skills.map((skill) => (
              <Grid
                container
                item
                xs={12}
                sm={6}
                key={skill.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Skill {...skill} />
              </Grid>
            ))
          ) : (
            <>
              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="80%" />
            </>
          )}
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
