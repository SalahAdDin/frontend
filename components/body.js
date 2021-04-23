import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import Content from "./content/content";
// import PersonalInformation from "./content/personalinformation"
import Skill from "./fields/skill";

const useStyles = makeStyles(() => ({
  root: { "& a": { textDecoration: "none" } },
}));

export const DynamicZone = ({ component, className }) => {
  const classes = useStyles();
  const { i18n } = useTranslation();

  return (
    <Typography
      variant="body1"
      component="section"
      className={clsx(classes.root, className)}
    >
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
  );
};

DynamicZone.propTypes = {
  component: PropTypes.shape({ __typename: PropTypes.string.isRequired }).isRequired,
  className: PropTypes.string,
};

export const Body = ({ body }) => {
  return body.map((component) => (
    <DynamicZone key={`component${component.id}`} component={component} />
  ));
};

Body.propTypes = {
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
};
