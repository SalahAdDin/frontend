import { Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

import Skill from "../fields/skill";

import Content from "./content";
import Experience from "./experience";
import PersonalInformation from "./personalInformation";

import type { IComponent } from "domain/dto/content.dto";
import useStyles from "presentation/styles/common";

interface IDynamicZone {
  component: IComponent;
  className?: string;
}

const DynamicZone: React.FC<IDynamicZone> = ({ component, className }) => {
  const classes = useStyles();

  const selectComponent = () => {
    switch (component.__typename) {
      case "ComponentContentRichText":
        return <Content>{component.text}</Content>;
      case "ComponentContentExperience":
        return <Experience {...component} last={false} />;
      case "ComponentContentPersonalInformation":
        return <PersonalInformation {...component} />;
      case "ComponentFieldsSkill":
        return <Skill {...component} />;
    }
  };

  return (
    <Typography
      variant="body1"
      component="section"
      className={clsx(classes.dynamicZone, className)}
    >
      {selectComponent()}
      {/*
      {
        {
          "content.rich-text": <Content>{component.text}</Content>,
          "content.experience": <Experience {...component} />,
          "content.personal-information": (
            <PersonalInformation {...component} />
          ),
          "fields.skill": <Skill {...component} />,
        }[component.__component]
      }
      */}
    </Typography>
  );
};

export default DynamicZone;
