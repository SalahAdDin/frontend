import PropTypes from "prop-types"
import Link from "next/link"
import { useRouter } from "next/router"
import { BlogJsonLd } from "next-seo"
import { Chip, Paper } from "@material-ui/core"
import ErrorPage from "../_error"
import { getAllPagesWithSlug, getPageBySlug } from "lib/api/pages"
import Layout from "components/layout"
import SEO from "components/seo"
import { CMS_AUTHOR, CMS_URL } from "lib/constants"
import useStyles from "styles/common"
import { Body } from "components/body"
import Title from "components/fields/title"
import Image from "components/fields/image"
import Loader from "components/loader"

const Post = ({
  slug,
  title_en: titleEn,
  title,
  thumbnail = {},
  description,
  body,
  created_at: createdAt,
  updated_at: updatedAt,
  tags,
  preview,
}) => {
  const globalClasses = useStyles()
  const router = useRouter()

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      {/* TODO: It goes in every place with the structure */}
      {router.isFallback ? (
        <Loader />
      ) : (
        <>
          <SEO
            canonical={process.env.NEXT_PUBLIC_BASE_URL + router.asPath}
            description={description}
            title={title}
            title_en={titleEn}
            openGraph={{
              type: "blog",
              article: {
                publishedTime: createdAt,
                modifiedTime: updatedAt,
                // expirationTime: "2022-12-21T22:04:11Z",
                section: "Posts",
                authors: [`${CMS_URL}`],
                tags: tags?.map((tag) => tag.label),
              },
              images: [
                {
                  url: thumbnail?.url,
                  width: thumbnail?.width,
                  height: thumbnail?.height,
                  alt: thumbnail?.caption,
                },
              ],
            }}
          />
          <BlogJsonLd
            url={process.env.NEXT_PUBLIC_BASE_URL + router.asPath}
            title={titleEn}
            images={[thumbnail?.url]}
            datePublished={createdAt}
            dateModified={updatedAt}
            authorName={CMS_AUTHOR}
            description={description?.description_en}
          />
          {thumbnail && (
            <Image
              alt={thumbnail?.alternativeText}
              src={thumbnail?.url}
              previewSrc={`${thumbnail?.url}?lqip`}
              title={thumbnail?.caption}
              className={globalClasses.heroImage}
            />
          )}
          <Title
            title={title}
            title_en={titleEn}
            component="h3"
            variant="h3"
            gutterBottom
          />
          <Body body={body} />
          <Paper elevation={0} className={globalClasses.tagsContainer}>
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

Post.propTypes = {
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
  thumbnail: PropTypes.shape({
    alternativeText: PropTypes.string,
    caption: PropTypes.string,
    height: PropTypes.number,
    url: PropTypes.string.isRequired,
  }),
  description: PropTypes.objectOf(PropTypes.string).isRequired,
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object),
  slug: PropTypes.string.isRequired,
  preview: PropTypes.bool,
}

export const getStaticProps = async ({ params, preview = null }) => {
  const data = await getPageBySlug(params.slug, preview)

  return { props: { preview, ...data?.pages[0] } }
}

export async function getStaticPaths() {
  const posts = await getAllPagesWithSlug()
  return {
    paths: posts?.map((post) => `/posts/${post.slug}`) || [],
    fallback: true,
  }
}

export default Post
