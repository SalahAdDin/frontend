import React from "react";

import DynamicZone from "./content/dynamicZone";

import type { IComponent } from "domain/dto/content.dto";

const Body: React.FC<{ body: IComponent[] }> = ({ body }) => (
  <>
    {body.map((component: IComponent) => (
      <DynamicZone key={`component_${component.id}`} component={component} />
    ))}
  </>
);

export default Body;
