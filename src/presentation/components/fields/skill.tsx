import { Rating, Typography } from "@material-ui/core";
import { ISkill } from "domain/dto/common.dto";
import React from "react";

type ISkillComponent = Omit<ISkill, "type" | "id">;

const Skill: React.FC<ISkillComponent> = ({ name, level }) => (
  <>
    <Typography component="legend">{name}</Typography>
    <Rating name={name} value={level} precision={0.5} readOnly />
  </>
);

export default Skill;
