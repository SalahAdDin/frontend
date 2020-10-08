import PropTypes from "prop-types"
import ErrorPage from "next/error"
import { useRouter } from "next/router"
import { Typography, Grid } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { useTranslation } from "../../i18n"
import { getTagBySlug, getAllTagsWithSlug } from "lib/api/tags"
import Layout from "components/layout"
import Project from "components/project"
import Post from "components/post"
import SEO from "components/seo"

const Tag = ({ slug, label, projects, pages }) => {
  const router = useRouter()
  const { t } = useTranslation()

  if (!router.isFallback && !slug) return <ErrorPage statusCode={404} />

  return (
    <Layout>
      {router.isFallback ? (
        <Skeleton />
      ) : (
        <>
          <SEO title_en={label} />
          <Typography variant="h3" component="h3" gutterBottom>
            {label}
          </Typography>
          {projects?.length > 0 && (
            <>
              <Typography variant="h5" component="h5" gutterBottom>
                {t("projects")}
              </Typography>
              <Grid container component="section" spacing={2}>
                {projects?.map((project) => (
                  <Project key={`project_${project.id}`} {...project} />
                ))}
              </Grid>
            </>
          )}
          {pages?.length > 0 && (
            <>
              <Typography variant="h5" component="h5" gutterBottom>
                {t("pages")}
              </Typography>
              <Grid container component="section" spacing={2}>
                {pages?.map((page) => (
                  <Post key={`page_${page.id}`} {...page} />
                ))}
              </Grid>
            </>
          )}
        </>
      )}
    </Layout>
  )
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object),
  pages: PropTypes.arrayOf(PropTypes.object),
}

export const getStaticProps = async ({ params }) => {
  const data = await getTagBySlug(params.slug)
  return { props: { ...data?.tags[0] }, revalidate: 1 }
}

export const getStaticPaths = async () => {
  const tags = await getAllTagsWithSlug()

  return { paths: tags?.map((tag) => `/tags/${tag.slug}`) || [], fallback: true }
}

export default Tag
