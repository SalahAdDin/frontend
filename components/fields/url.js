import PropTypes from "prop-types";
import { Link } from "@material-ui/core";
import { GitHub, Home, LinkedIn } from "@material-ui/icons";
import useStyles from "styles/common";
import BitBucket from "assets/svg/bitbucket.svg";
import GitLab from "assets/svg/gitlab.svg";
import StackOverflow from "assets/svg/stack-overflow.svg";

const URL = ({ type, url }) => {
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

URL.propTypes = {
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default URL;
