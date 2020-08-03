import PropTypes from "prop-types"
import ErrorPage from "next/error"
import { useRouter } from "next/router"
import { ProductJsonLd } from "next-seo"
import ReactPlayer from "react-player"
import { Chip, Divider, Link as LinkUI, Paper, makeStyles } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { getAllProjectsWithID, getProjectByID } from "@/lib/api/projects"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import { CMS_NAME } from "@/lib/constants"
import Title from "@/components/fields/title"
import Content from "@/components/content/content"
import Link from "next/link"

const useStyles = makeStyles((theme) => ({
  tagsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}))

const Project = ({
  id,
  title,
  title_en,
  thumbnail,
  video,
  category,
  description,
  links,
  content,
  tags,
}) => {
  const classes = useStyles()
  const router = useRouter()

  if (!router.isFallback && !id) return <ErrorPage statusCode={404} />

  return (
    <Layout>
      {router.isFallback ? (
        <Skeleton />
      ) : (
        <>
          <SEO
            description={description}
            title={title}
            title_en={title_en}
            openGraph={{
              type: "product",
              images: [
                {
                  url: thumbnail?.url,
                  width: thumbnail?.width,
                  height: thumbnail?.height,
                  alt: thumbnail?.alternativeText,
                },
              ],
              videos: [
                {
                  name: video?.name,
                  contentUrl: video?.url,
                  description: video?.caption,
                  uploadDate: video?.updated_at,
                  tags: tags?.map((tag) => tag.label),
                  thumbnailUrls: [video?.previewUrl],
                },
              ],
            }}
          />
          <ProductJsonLd
            productName={title_en}
            images={[thumbnail?.url]}
            description={description?.description_en}
            brand={CMS_NAME}
          />
          {video ? (
            <ReactPlayer
              url={video?.url}
              light={video?.previewUrl}
              controls
              playing
              style={{ margin: "auto" }}
            />
          ) : (
            <img
              src={thumbnail?.url}
              alt={thumbnail?.alternativeText}
              title={thumbnail?.caption}
              style={{ margin: "auto" }}
            />
          )}
          <Title
            title={title}
            title_en={title_en}
            component="h3"
            variant="h3"
            gutterBottom
          />
          <Paper elevation={0} className={classes.tagsContainer}>
            <Link href={`/categories/${category.slug}`} passHref>
              <Chip label={category.name} color="primary" variant="outlined" />
            </Link>
            <Divider orientation="vertical" flexItem />
            {links.map((link) => (
              <LinkUI
                key={"links_" + link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                underline="none"
                style={{ marginTop: "auto", marginBottom: "auto" }}
              >
                {link.url.replace("https://", "")}
              </LinkUI>
            ))}
          </Paper>
          <Divider light />
          {content ? (
            <Content>
              {
                content[
                  Object.keys(content).find(
                    (content) => content.split("_")[1] == i18n.language
                  )
                ]
              }
            </Content>
          ) : (
            <>
              <Skeleton
                animation="wave"
                variant="text"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" variant="text" height={10} width="80%" />
            </>
          )}
          <Paper elevation={0} className={classes.tagsContainer}>
            {tags.length > 0 &&
              tags?.map((tag) => (
                <Link href={`/tags/${tag.slug}`} passHref key={"tag_" + tag.id}>
                  <Chip variant="outlined" label={tag.label} />
                </Link>
              ))}
          </Paper>
        </>
      )}
    </Layout>
  )
}

Project.propTypes = {
  id: PropTypes.string.isRequired,
  title_en: PropTypes.string.isRequired,
  title: PropTypes.object,
  description: PropTypes.object,
  thumbnail: PropTypes.shape({
    alternativeText: PropTypes.string,
    caption: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    url: PropTypes.string.isRequired,
  }),
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
  content: PropTypes.object,
  tags: PropTypes.array,
  video: PropTypes.shape({
    alternativeText: PropTypes.string,
    caption: PropTypes.string,
    name: PropTypes.string,
    previewUrl: PropTypes.string,
    updated_at: PropTypes.string,
    url: PropTypes.string.isRequired,
  }),
}

export async function getStaticProps({ params }) {
  const data = await getProjectByID(params.id)

  return { props: { ...data?.project }, unstable_revalidate: 1 }
}

export async function getStaticPaths() {
  const projects = await getAllProjectsWithID()

  return {
    paths: projects?.map((project) => `/projects/${project.id}`) || [],
    fallback: true,
  }
}

export default Project
