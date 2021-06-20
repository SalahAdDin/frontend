import { Rating, Typography } from "@material-ui/core";
import React from "react";

import type { ISkill } from "domain/dto/fields.dto";

type ISkillComponent = Omit<ISkill, "type" | "id">;

const Skill: React.FC<ISkillComponent> = ({ name, level }) => (
  <>
    <Typography component="legend">{name}</Typography>
    <Rating name={name} value={level} precision={0.5} readOnly />
  </>
);

export default Skill;
