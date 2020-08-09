import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import { Typography } from "@material-ui/core"
import Content from "./content/content"
import PersonalInformation from "./content/personalinformation"
import Skill from "./fields/skill"

export const DynamicZone = ({ component }) => {
  const { i18n } = useTranslation()

  return (
    <Typography variant="body1" component="section">
      {
        {
          ComponentContentContent: (
            <Content>
              {
                component[
                  Object.keys(component).find(
                    (content) => content.split("_")[1] == i18n.language
                  )
                ]
              }
            </Content>
          ),
          // TODO: next ones create problem with props.
          ComponentContentExperience: <></>, // Right-now this one is a TimelineItem
          ComponentContentPersonalInformation: (
            <PersonalInformation {...component} />
          ),
          ComponentFieldsSkill: <Skill {...component} />,
        }[component.__typename]
      }
    </Typography>
  )
}

DynamicZone.propTypes = { component: PropTypes.object.isRequired }

export const Body = ({ body }) => {
  return body.map((component) => (
    <DynamicZone key={"component" + component.id} component={component} />
  ))
}

Body.propTypes = {
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
}
