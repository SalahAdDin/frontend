import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Link as LinkUI } from "@material-ui/core";

const Tag = ({ label, slug, comma }) => {
  return (
    <Link href={`/tags/${slug}`} passHref>
      <LinkUI underline="none" style={{ marginRight: "0.25rem" }}>
        {label}
        {comma ? "," : ""}
      </LinkUI>
    </Link>
  );
};

Tag.defaultProps = { comma: false };

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  comma: PropTypes.bool,
};

export default Tag;
