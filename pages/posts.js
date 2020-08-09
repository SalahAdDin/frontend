import PropTypes from "prop-types"
import { useRouter } from "next/router"
import ErrorPage from "next/error"
import { Grid } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { getPageAndTagBySlug } from "@/lib/api/tags"
import SEO from "@/components/seo"
import Layout from "@/components/layout"
import { DynamicZone } from "@/components/body"
import Title from "@/components/fields/title"
import Post from "@/components/post"

const Posts = ({ title_en, slug, title, description, body, pagesByTag }) => {
  const router = useRouter()

  const contents = body.find((item) => item.__typename == "ComponentContentContent")

  if (!router.isFallback && !slug) return <ErrorPage statusCode={404} />

  return (
    <Layout>
      {router.isFallback ? (
        <Skeleton />
      ) : (
        <>
          <SEO description={description} title={title} title_en={title_en} />
          <Title title={title} title_en={title_en} />
          {/* TODO: Does this have a content? */}
          {contents ? (
            <DynamicZone component={contents} />
          ) : (
            <>
              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="80%" />
            </>
          )}
          <Grid container spacing={2} component="section">
            {pagesByTag.length > 0 &&
              pagesByTag.map((page) => <Post key={"blog_" + page.id} {...page} />)}
          </Grid>
        </>
      )}
    </Layout>
  )
}

Posts.propTypes = {
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
  description: PropTypes.objectOf(PropTypes.string).isRequired,
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
  slug: PropTypes.string.isRequired,
  pagesByTag: PropTypes.arrayOf(PropTypes.object),
}

export const getStaticProps = async () => {
  const data = await getPageAndTagBySlug("posts", "blog")
  return {
    props: { ...data?.pages[0], pagesByTag: data?.tags[0]?.pages },
    unstable_revalidate: 1,
  }
}

export default Posts
