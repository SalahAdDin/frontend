import PropTypes from "prop-types"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  CardMedia,
} from "@material-ui/core"
import { NavigateNext } from "@material-ui/icons"
import Title from "./fields/title"
import Tag from "./fields/tag"

const Post = ({ slug, title, title_en, thumbnail = {}, description, tags }) => {
  const router = useRouter()
  const { i18n } = useTranslation()
  return (
    <Grid item xs={12} sm={4} component="article">
      <Card>
        {/* TODO: Pass correct components inside of article ever i used as article component */}
        {thumbnail && (
          <CardMedia
            component="img"
            alt={thumbnail.alternativeText}
            // height={thumbnail.height}
            image={thumbnail.url}
            title={thumbnail.caption}
          />
        )}
        <CardContent component="main">
          <Title
            title={title}
            title_en={title_en}
            variant="h5"
            component="h5"
            gutterBottom
            align="left"
          />
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
        <CardActions
          disableSpacing
          style={{ paddingLeft: 16, justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {tags.length > 0 &&
              tags.map((tag, i) => (
                <Tag key={"tag_" + tag.id} {...tag} comma={tags.length - 1 > i} />
              ))}
          </div>
          <IconButton
            aria-label="Go to Project"
            onClick={() => router.push(`/posts/${slug}`)}
          >
            <NavigateNext />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
}

Post.propTypes = {
  slug: PropTypes.string.isRequired,
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
  thumbnail: PropTypes.shape({
    alternativeText: PropTypes.string,
    caption: PropTypes.string,
    height: PropTypes.number,
    url: PropTypes.string.isRequired,
  }),
  description: PropTypes.objectOf(PropTypes.string).isRequired,
  tags: PropTypes.array,
}

export default Post
