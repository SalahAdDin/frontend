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
import { useTranslation } from "react-i18next"
import Telephone from "../fields/telephone"
import URL from "../fields/url"
import Content from "./content"

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
}))

const PersonalInformation = ({ personalInformation }) => {
  const { i18n } = useTranslation()

  const classes = useStyles()

  const {
    name,
    photo,
    position,
    mail,
    nationality,
    address,
    links,
    telephone,
    aboutme,
  } = personalInformation

  return (
    <Card elevation={0} component="section">
      <CardHeader
        align="center"
        title={
          <>
            <Typography variant="h5" component="h5">
              {name}
            </Typography>
            <Typography variant="h6" component="h6">
              {position}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1" component="h6">
              {mail}
            </Typography>
          </>
        }
        subheader={
          <>
            <Typography variant="body2" component="p">
              {address.address}/{address.city} [{address.postalcode}] -
              {address.country}
            </Typography>
            <List aria-label="telephones">
              {telephone.map((phone) => (
                <Telephone key={phone.id} phone={phone} />
              ))}
            </List>
            <List aria-label="links">
              {links.map((link) => (
                <URL key={link.id} link={link} />
              ))}
            </List>
          </>
        }
        avatar={
          <Avatar
            aria-label="Profile Photo"
            alt="Profile Photo"
            src={photo.url}
            align="center"
            className={classes.large}
          >
            LA
          </Avatar>
        }
      />
      <CardContent>
        <Typography variant="body1" component="div">
          <Content>
            {
              aboutme[
                Object.keys(aboutme).find(
                  (content) => content.split("_")[1] == i18n.language
                )
              ]
            }
          </Content>
        </Typography>
      </CardContent>
    </Card>
  )
}

PersonalInformation.propTypes = {
  personalInformation: PropTypes.shape({
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
  }),
}

export default PersonalInformation
