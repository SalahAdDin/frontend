import PropTypes from "prop-types"
import ErrorPage from "next/error"
import { useRouter } from "next/router"
import { Typography, Grid } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { getCategoryBySlug, getAllCategoriesWithSlug } from "@/lib/api/categories"
import SEO from "@/components/seo"
import Layout from "@/components/layout"
import Project from "@/components/project"

const Category = ({ name, slug, description, projects }) => {
  const router = useRouter()

  if (!router.isFallback && !slug) return <ErrorPage statusCode={404} />

  return (
    <Layout>
      {router.isFallback ? (
        <Skeleton />
      ) : (
        <>
          <SEO description={description} title_en={name} />
          <Typography variant="h3" component="h3" gutterBottom>
            {name}
          </Typography>
          <Grid container component="section" spacing={2}>
            {projects.map((project) => (
              <Project key={"project_id" + project.id} {...project} />
            ))}
          </Grid>
        </>
      )}
    </Layout>
  )
}

Category.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  description: PropTypes.objectOf(PropTypes.string),
  projects: PropTypes.arrayOf(PropTypes.object),
}

export const getStaticProps = async ({ params }) => {
  const data = await getCategoryBySlug(params.slug)
  return { props: { ...data?.categories[0] }, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
  const categories = await getAllCategoriesWithSlug()

  return {
    paths: categories?.map((category) => `/categories/${category.slug}`) || [],
    fallback: true,
  }
}

export default Category
