import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
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
import Tag from "./fields/tag"

const Project = ({ id, title, thumbnail, description, tags }) => {
  const router = useRouter()
  const { i18n } = useTranslation()

  return (
    <Grid item xs={12} sm={4} component="article">
      <Card>
        <CardMedia
          component="img"
          alt={thumbnail.alternativeText}
          // height={thumbnail.height}
          image={thumbnail.url}
          title={thumbnail.caption}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {
              description[
                Object.keys(description).find(
                  (description) => description.split("_")[1] == i18n.language
                )
              ]
            }
          </Typography>
        </CardContent>
        <CardActions disableSpacing style={{ paddingLeft: 16 }}>
          {tags.length > 0 &&
            tags.map((tag, i) => (
              <Tag key={"tag_" + tag.id} {...tag} comma={tags.length - 1 > i} />
            ))}
          <IconButton
            aria-label="Go to Project"
            style={{ marginLeft: "auto" }}
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
  title: PropTypes.string.isRequired,
  description: PropTypes.object,
  thumbnail: PropTypes.shape({
    alternativeText: PropTypes.string,
    caption: PropTypes.string,
    height: PropTypes.number,
    url: PropTypes.string.isRequired,
  }),
  tags: PropTypes.array,
}

export default Project
