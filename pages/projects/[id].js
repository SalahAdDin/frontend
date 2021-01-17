import PropTypes from "prop-types"
import Link from "next/link"
import { useRouter } from "next/router"
import { ProductJsonLd } from "next-seo"
import ReactPlayer from "react-player/lazy"
import { Chip, Divider, Link as LinkUI, Paper } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { getAllProjectsWithID, getProjectByID } from "lib/api/projects"
import { CMS_NAME, CMS_URL } from "lib/constants"
import useStyles from "styles/common"
import SEO from "components/seo"
import { DynamicZone } from "components/body"
import Title from "components/fields/title"
import Picture from "components/fields/image"
import Layout from "components/layout"
import Loader from "components/loader"
import ErrorPage from "../_error"

const Project = ({
  id,
  title,
  title_en: titleEn,
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
        <Loader />
      ) : (
        <>
          <SEO
            description={description}
            title={title}
            title_en={titleEn}
            openGraph={{
              type: "product",
              article: {
                section: "Projects",
                authors: [`${CMS_URL}`],
                tags: tags?.map((tag) => tag.label),
              },
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
            twitter={{
              image: {
                alt: thumbnail?.alternativeText,
              },
            }}
          />
          <ProductJsonLd
            productName={titleEn}
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
            <Picture
              className={classes.heroImage}
              aria-label={thumbnail?.alternativeText}
              alt={thumbnail?.alternativeText}
              title={thumbnail?.caption}
              src={thumbnail?.url}
              width={thumbnail?.width}
              height={thumbnail?.height}
            />
          )}
          <Title
            title={title}
            title_en={titleEn}
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
                key={`links_${link.id}`}
                href={link.url}
                target="_blank"
                rel="noopener"
                underline="none"
                style={{ marginTop: "auto", marginBottom: "auto" }}
              >
                {link.url.replace("https://", "")}
              </LinkUI>
            ))}
          </Paper>
          <Divider light />
          {content ? (
            <DynamicZone
              component={{ ...content, __typename: "ComponentContentContent" }}
            />
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
                <Link href={`/tags/${tag.slug}`} passHref key={`tag_${tag.id}`}>
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
  title: PropTypes.objectOf(PropTypes.string),
  description: PropTypes.objectOf(PropTypes.string),
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
  content: PropTypes.objectOf(PropTypes.string),
  tags: PropTypes.arrayOf(PropTypes.object),
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

  return { props: { ...data?.project }, revalidate: 1 }
}

export async function getStaticPaths() {
  const projects = await getAllProjectsWithID()

  return {
    paths: projects?.map((project) => `/projects/${project.id}`) || [],
    fallback: true,
  }
}

export default Project
