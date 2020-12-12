import PropTypes from "prop-types"
import Image from "next/image"
import { useRouter } from "next/router"
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
import { useTranslation } from "../i18n"
import Title from "./fields/title"
import Tag from "./fields/tag"

const Post = ({
  slug,
  title,
  title_en: titleEn,
  thumbnail = {},
  description,
  tags,
}) => {
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
        {/* TODO: Pass correct components inside of article ever i used as article component */}
        {thumbnail && (
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
        )}
        <CardContent component="main">
          <Title
            title={title}
            title_en={titleEn}
            variant="h5"
            component="h5"
            gutterBottom
            align="left"
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
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.height,
  }),
  description: PropTypes.objectOf(PropTypes.string).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object),
}

export default Post
