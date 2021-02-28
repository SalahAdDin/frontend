import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core"
import { NavigateNext } from "@material-ui/icons"
import Image from "next/image"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import PropTypes from "prop-types"
import Tag from "./fields/tag"
import Title from "./fields/title"

const Project = ({ id, title, title_en: titleEn, thumbnail, description, tags }) => {
  const router = useRouter()
  const { i18n } = useTranslation()

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      component="article"
      style={{ marginBottom: "1rem" }}
    >
      <Card>
        <CardMedia
          component={() => (
            <Image
              className="MuiAvatar-img"
              aria-label={thumbnail?.alternativeText}
              src={thumbnail?.url}
              alt={thumbnail?.alternativeText}
              title={thumbnail?.caption}
              width={thumbnail?.width}
              height={thumbnail?.height}
            />
          )}
        />
        <CardContent>
          <Title
            title={title}
            title_en={titleEn}
            component="h5"
            variant="h5"
            align="left"
            gutterBottom
          />
          <Typography variant="body2" color="textSecondary" component="p">
            {
              description[
                Object.keys(description).find(
                  (item) => item.split("_")[1] === i18n.language
                )
              ]
            }
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          style={{ paddingLeft: 16, justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {tags.length > 0 &&
              tags.map((tag, i) => (
                <Tag key={`tag_${tag.id}`} {...tag} comma={tags.length - 1 > i} />
              ))}
          </div>
          <IconButton
            aria-label="Go to Project"
            onClick={() => router.push(`/projects/${id}`)}
          >
            <NavigateNext />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
}

Project.propTypes = {
  id: PropTypes.string.isRequired,
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
  description: PropTypes.objectOf(PropTypes.string),
  thumbnail: PropTypes.shape({
    alternativeText: PropTypes.string,
    caption: PropTypes.string,
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.height,
  }),
  tags: PropTypes.arrayOf(PropTypes.object),
}

export default Project
