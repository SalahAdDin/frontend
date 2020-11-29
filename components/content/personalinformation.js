import PropTypes from "prop-types"
import {
  makeStyles,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
  List,
} from "@material-ui/core"
import { MailOutline, Room } from "@material-ui/icons"
import { Skeleton } from "@material-ui/lab"
import useGlobalStyles from "styles/common"
import { DynamicZone } from "../body"
import Telephone from "../fields/telephone"
import URL from "../fields/url"

const useStyles = makeStyles((theme) => ({
  header: {
    [theme.breakpoints.down(660)]: {
      display: "block",
      "& .MuiCardHeader-avatar": { marginRight: 0, marginBottom: 16 },
    },
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  noPadding: {
    paddingTop: 0,
    paddingBottom: 0,
    "& li": {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
}))

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
  const globalClasses = useGlobalStyles()

  return (
    <Card elevation={0} component="section">
      <CardHeader
        align="center"
        className={classes.header}
        avatar={
          photo ? (
            <Avatar
              aria-label="Profile Photo"
              alt="Profile Photo"
              srcSet={`${profilePhoto?.formats?.large?.url} 1000w, ${profilePhoto?.formats?.medium?.url} 750w,${profilePhoto?.formats?.small?.url} 500w`}
              src={profilePhoto?.formats?.small?.url}
              align="center"
              className={classes.large}
              imgProps={{
                width: profilePhoto?.formats?.small?.width,
                height: profilePhoto?.formats?.small?.height,
              }}
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
              <Typography variant="h5" component="h5">
                {name}
              </Typography>
              <Typography variant="h6" component="h6">
                {position}
              </Typography>
              <Typography color="textSecondary" variant="subtitle1" component="h6">
                <MailOutline className={globalClasses.inlineSmallIcon} />
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
                <Room className={globalClasses.inlineSmallIcon} />
                {address.address && `${address.address} / `}
                {`${address.city} `}
                {address.postalcode && `[${address.postalcode}]`}
                {address.country && ` - ${address.country}`}
              </Typography>
              <List aria-label="telephones" className={classes.noPadding}>
                {telephone.map((phone) => (
                  <Telephone key={phone.id} {...phone} />
                ))}
              </List>
              <List aria-label="links" className={classes.noPadding}>
                {links.map((link) => (
                  <URL key={`links_${link.id}`} {...link} />
                ))}
              </List>
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
