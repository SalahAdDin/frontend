import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Typography,
} from "@material-ui/core";
import { MailOutline, Room } from "@material-ui/icons";
import Image from "next/image";
import React from "react";

import Telephone from "../fields/telephone";
import URL from "../fields/url";

import Content from "./content";

import type { IPersonalInformation } from "domain/dto/content.dto";
import useStyles from "presentation/styles/common";

const PersonalInformation: React.FC<IPersonalInformation> = ({
  name,
  photo,
  position,
  mail,
  // nationality,
  address,
  links,
  telephone,
  aboutMe,
}) => {
  const classes = useStyles();
  return (
    <Card elevation={0} component="section">
      <CardHeader
        align="center"
        className={classes.avatarHeader}
        avatar={
          photo ? (
            <Avatar
              component={() => (
                <Image
                  alt={photo?.alternativeText}
                  title={photo?.caption}
                  aria-label={photo?.alternativeText}
                  className="MuiAvatar-img"
                  width={240}
                  height={320}
                  src={photo?.url}
                  placeholder="blur"
                />
              )}
            >
              LA
            </Avatar>
          ) : (
            <Skeleton animation="wave" variant="circular" />
          )
        }
        title={
          <>
            <Typography variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="h6" component="h3">
              {position}
            </Typography>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              component="h4"
            >
              <MailOutline className={classes.inlineSmallIcon} />
              {mail}
            </Typography>
          </>
        }
        subheader={
          address ? (
            <>
              <Typography variant="body2" component="p">
                <Room className={classes.inlineSmallIcon} />
                {address.address && `${address.address} / `}
                {`${address.city} `}
                {address.postalCode && `[${address.postalCode}]`}
                {address.country && ` - ${address.country}`}
              </Typography>
              <ul aria-label="telephones" className={classes.noPadding}>
                {telephone?.map((phone) => (
                  <Telephone key={phone.id} {...phone} />
                ))}
              </ul>
              <ul aria-label="links" className={classes.noPadding}>
                {links?.map((link) => (
                  <URL key={`links_${link.id}`} {...link} />
                ))}
              </ul>
            </>
          ) : (
            <Skeleton animation="wave" height={10} width="40%" />
          )
        }
      />
      <CardContent>
        {aboutMe ? (
          <Content>{aboutMe}</Content>
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
    </Card>
  );
};

export default PersonalInformation;
