import "dayjs/locale/es";
import "dayjs/locale/tr";

import {
  Card,
  CardContent,
  CardHeader,
  Link,
  Skeleton,
  Typography,
} from "@material-ui/core";
import { Language, Room } from "@material-ui/icons";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@material-ui/lab";
import dayjs from "dayjs";
import type { IExperience } from "domain/dto/content.dto";
import { useTranslation } from "next-i18next";
import useStyles from "presentation/styles/common";
import React from "react";

import Content from "./content";

const Experience: React.FC<
  IExperience & {
    last: boolean;
  }
> = ({
  from,
  ongoing,
  to,
  address,
  description,
  institution,
  title,
  url,
  last = false,
}) => {
  const classes = useStyles();
  const { i18n } = useTranslation();

  return (
    <TimelineItem className={classes.experience}>
      <TimelineOppositeContent className="timeline-flag">
        <Typography variant="h6" component="span">
          {title}
        </Typography>
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
              <Typography variant="h6" component="h2">
                {institution}
              </Typography>
            }
            subtitle={
              address ? (
                <>
                  <Typography variant="body2" component="p">
                    <Room className={classes.inlineSmallIcon} />
                    {address.address && `${address.address} / `}
                    {`${address.city} `}
                    {address.postalCode && `[${address.postalCode}]`}
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
                        <Language className={classes.inlineSmallIcon} />
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
        </Card>
        <CardContent>
          {description ? (
            <Content>{description}</Content>
          ) : (
            <>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </>
          )}
        </CardContent>
      </TimelineContent>
    </TimelineItem>
  );
};

export default Experience;
