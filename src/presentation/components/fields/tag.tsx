import { Link as LinkUI } from "@material-ui/core";
import Link from "next/link";
import { ITag } from "domain/dto/common.dto";
import React from "react";

type TTagComponent = Omit<ITag, "id">;

interface ITagComponent extends TTagComponent {
  comma?: boolean;
}

const Tag: React.FC<ITagComponent> = ({ label, slug, comma = false }) => (
  <Link href={`/tags/${slug}`} passHref>
    <LinkUI underline="none" style={{ marginRight: "0.25rem" }}>
      {label}
      {comma ?? ","}
    </LinkUI>
  </Link>
);

export default Tag;
