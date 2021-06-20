import { Link } from "@material-ui/core";
import { GitHub, Home, LinkedIn } from "@material-ui/icons";
import React from "react";

import BitBucket from "assets/svg/bitbucket.svg";
import GitLab from "assets/svg/gitlab.svg";
import StackOverflow from "assets/svg/stack-overflow.svg";
import type { ISocialLink } from "domain/dto/fields.dto";
import useStyles from "presentation/styles/common";

const URL: React.FC<ISocialLink> = ({ type, url }) => {
  const classes = useStyles();

  return (
    <li className={classes.url}>
      <Link
        href={`//${url}`}
        target="_blank"
        rel="noopener"
        aria-label={type}
        color="inherit"
      >
        {
          {
            Home: <Home />,
            Github: <GitHub />,
            BitBucket: <BitBucket />,
            GitLab: <GitLab />,
            StackOverflow: <StackOverflow />,
            LinkedIn: <LinkedIn />,
          }[type]
        }
      </Link>
    </li>
  );
};

export default URL;
