import PropTypes from "prop-types"
import { useRouter } from "next/router"
import ErrorPage from "next/error"
import { useTranslation } from "react-i18next"
import { Skeleton } from "@material-ui/lab"
import { getPageBySlugAndCategory } from "@/lib/api/categories"
import Title from "@/components/fields/title"
import SEO from "@/components/seo"
import Category from "@/components/category"
import Layout from "@/components/layout"
import { DynamicZone } from "@/components/body"

function Projects({ title_en, slug, title, description, body, categories }) {
  const router = useRouter()
  const { i18n } = useTranslation()

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
          {contents ? (
            <DynamicZone component={contents} />
          ) : (
            <>
              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="80%" />
            </>
          )}
          {categories.map((category) =>
            category.projects.length > 0 ? (
              <Category key={"category_" + category.id} {...category} />
            ) : (
              ""
            )
          )}
        </>
      )}
    </Layout>
  )
}

Projects.propTypes = {
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
  description: PropTypes.objectOf(PropTypes.string).isRequired,
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
  slug: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object),
}

export const getStaticProps = async () => {
  const data = await getPageBySlugAndCategory("projects")

  return {
    props: { ...data?.pages[0], categories: data?.categories },
    revalidate: 1,
  }
}

export default Projects
