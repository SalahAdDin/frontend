import PropTypes from "prop-types"
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core"
import { NavigateNext } from "@material-ui/icons"
import { useRouter } from "next/router"
import { useTranslation } from "../i18n"
import Tag from "./fields/tag"
import Title from "./fields/title"

const Project = ({ id, title, title_en: titleEn, thumbnail, description, tags }) => {
  const router = useRouter()
  const { i18n } = useTranslation()

  return (
    <Grid item xs={12} sm={6} md={4} component="article">
      <Card>
        <CardMedia
          component="img"
          alt={thumbnail.alternativeText}
          // height={thumbnail.height}
          image={thumbnail.url}
          title={thumbnail.caption}
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
  title: PropTypes.shape(PropTypes.string),
  description: PropTypes.shape(PropTypes.string),
  thumbnail: PropTypes.shape({
    alternativeText: PropTypes.string,
    caption: PropTypes.string,
    height: PropTypes.number,
    url: PropTypes.string.isRequired,
  }),
  tags: PropTypes.arrayOf(PropTypes.object),
}

export default Project
