import PropTypes from "prop-types"
import { Typography, makeStyles } from "@material-ui/core"
import { useTranslation } from "../i18n"
import Content from "./content/content"
// import PersonalInformation from "./content/personalinformation"
import Skill from "./fields/skill"

const useStyles = makeStyles(() => ({
  root: { "& a": { textDecoration: "none" } },
}))

export const DynamicZone = ({ component }) => {
  const classes = useStyles()
  const { i18n } = useTranslation()

  return (
    <Typography variant="body1" component="section" className={classes.root}>
      {
        {
          ComponentContentContent: (
            <Content>
              {
                component[
                  Object.keys(component).find(
                    (content) => content.split("_")[1] === i18n.language
                  )
                ]
              }
            </Content>
          ),
          // Right-now this one is a TimelineItem
          // ComponentContentExperience: <></>,
          // ComponentContentPersonalInformation: (
          //   <PersonalInformation {...component} />
          // ),
          ComponentFieldsSkill: <Skill {...component} />,
        }[component.__typename]
      }
    </Typography>
  )
}

DynamicZone.propTypes = {
  component: PropTypes.shape({ __typename: PropTypes.string.isRequired }).isRequired,
}

export const Body = ({ body }) => {
  return body.map((component) => (
    <DynamicZone key={`component${component.id}`} component={component} />
  ))
}

Body.propTypes = {
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
}
