import {
  Card,
  CardContent,
  CardHeader,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Language, Room } from "@material-ui/icons";
import {
  Skeleton,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@material-ui/lab";
import dayjs from "dayjs";
import "dayjs/locale/es";
import "dayjs/locale/tr";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import useGlobalStyles from "styles/common";
import Content from "./content";

const useStyles = makeStyles((theme) => ({
  root: {
    "& a": { textDecoration: "none" },
    "& .timeline-flag": {
      marginTop: "-2rem",
      [theme.breakpoints.down(720)]: {
        textAlign: "left",
        marginTop: "inherit",
      },
    },
    "& .timeline-content": {
      marginTop: "-3.5rem",
      marginBottom: "1rem",
      [theme.breakpoints.down(720)]: {
        padding: "inherit",
        marginTop: "inherit",
      },
    },
    [theme.breakpoints.down(720)]: {
      display: "list-item",
      "& .MuiTimelineSeparator-root": {
        display: "none",
      },
    },
  },
}));

const Experience = ({
  from,
  ongoing,
  to,
  address,
  description,
  institution,
  title,
  url,
  last,
}) => {
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const { i18n } = useTranslation();

  return (
    <TimelineItem className={classes.root}>
      <TimelineOppositeContent className="timeline-flag">
        {title ? (
          <Typography variant="h6" component="span">
            {title}
          </Typography>
        ) : (
          <Skeleton animation="wave" height={10} width="40%" />
        )}
        <Typography color="textSecondary">
          {`${dayjs(from).locale(`${i18n.language}`).format("MMMM YYYY")} `}
          {ongoing ? (
            ""
          ) : (
            <>
              &mdash;
              {` ${dayjs(to).locale(`${i18n.language}`).format("MMMM YYYY")}`}
            </>
          )}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        {last ? "" : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent className="timeline-content">
        <Card elevation={0} component="article">
          <CardHeader
            title={
              institution ? (
                <Typography variant="h6" component="h2">
                  {institution}
                </Typography>
              ) : (
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />
              )
            }
            subheader={
              address ? (
                <>
                  <Typography variant="body2" component="p">
                    <Room className={globalClasses.inlineSmallIcon} />
                    {address.address && `${address.address} / `}
                    {`${address.city} `}
                    {address.postalcode && `[${address.postalcode}]`}
                    {address.country && ` - ${address.country}`}
                    {url && (
                      <Link
                        href={`//${url}`}
                        target="_blank"
                        rel="noopener"
                        style={{
                          // margin: "0 1rem",
                          color: "inherit",
                          textDecoration: "none",
                        }}
                      >
                        <Language className={globalClasses.inlineSmallIcon} />
                        {url}
                      </Link>
                    )}
                  </Typography>
                </>
              ) : (
                <Skeleton animation="wave" height={10} width="40%" />
              )
            }
          />
          <CardContent>
            {description ? (
              <Content>
                {
                  description[
                    Object.keys(description).find(
                      (content) => content.split("_")[1] === i18n.language
                    )
                  ]
                }
              </Content>
            ) : (
              <>
                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={10} width="80%" />
              </>
            )}
          </CardContent>
        </Card>
      </TimelineContent>
    </TimelineItem>
  );
};

Experience.propTypes = {
  address: PropTypes.shape({
    address: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    postalcode: PropTypes.number,
  }),
  description: PropTypes.objectOf(PropTypes.string),
  from: PropTypes.string.isRequired,
  institution: PropTypes.string.isRequired,
  last: PropTypes.bool.isRequired,
  ongoing: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  url: PropTypes.string,
};

export default Experience;
