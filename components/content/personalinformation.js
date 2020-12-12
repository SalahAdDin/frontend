import PropTypes from "prop-types"
import { Avatar, Card, CardContent, CardHeader, Typography } from "@material-ui/core"
import { MailOutline, Room } from "@material-ui/icons"
import { Skeleton } from "@material-ui/lab"
import Image from "next/image"
import useStyles from "styles/common"
import { DynamicZone } from "../body"
import Telephone from "../fields/telephone"
import URL from "../fields/url"

const PersonalInformation = ({
  name,
  photo,
  position,
  mail,
  // nationality,
  address,
  links,
  telephone,
  aboutme,
}) => {
  const classes = useStyles()

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
                  align="center"
                />
              )}
            >
              LA
            </Avatar>
          ) : (
            <Skeleton animation="wave" variant="circle" className={classes.large} />
          )
        }
        title={
          name && position && mail ? (
            <>
              <Typography variant="h5" component="h2">
                {name}
              </Typography>
              <Typography variant="h6" component="h3">
                {position}
              </Typography>
              <Typography color="textSecondary" variant="subtitle1" component="h4">
                <MailOutline className={classes.inlineSmallIcon} />
                {mail}
              </Typography>
            </>
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
                <Room className={classes.inlineSmallIcon} />
                {address.address && `${address.address} / `}
                {`${address.city} `}
                {address.postalcode && `[${address.postalcode}]`}
                {address.country && ` - ${address.country}`}
              </Typography>
              <ul aria-label="telephones" className={classes.noPadding}>
                {telephone.map((phone) => (
                  <Telephone key={phone.id} {...phone} />
                ))}
              </ul>
              <ul aria-label="links" className={classes.noPadding}>
                {links.map((link) => (
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
        {aboutme ? (
          <DynamicZone
            component={{ ...aboutme, __typename: "ComponentContentContent" }}
          />
        ) : (
          <>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        )}
      </CardContent>
    </Card>
  )
}

PersonalInformation.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.shape({
    alternativeText: PropTypes.string,
    caption: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    url: PropTypes.string.isRequired,
  }),
  position: PropTypes.string,
  mail: PropTypes.string,
  nationality: PropTypes.string,
  address: PropTypes.shape({
    address: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    postalcode: PropTypes.number,
  }),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
  telephone: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })
  ),
  aboutme: PropTypes.objectOf(PropTypes.string),
}

export default PersonalInformation
