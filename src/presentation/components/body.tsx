import { IComponent } from "domain/dto/content.dto";
import React from "react";

import DynamicZone from "./content/dynamicZone";

const Body: React.FC<{ body: IComponent[] }> = ({ body }) => (
  <>
    {body.map((component: IComponent) => (
      <DynamicZone key={`component_${component.id}`} component={component} />
    ))}
  </>
);

export default Body;
