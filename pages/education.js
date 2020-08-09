import PropTypes from "prop-types"
import ErrorPage from "next/error"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import { Skeleton, Timeline } from "@material-ui/lab"
import { getPageBySlug } from "@/lib/api/pages"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import Experience from "@/components/content/experience"
import Content from "@/components/content/content"
import Title from "@/components/fields/title"
import { DynamicZone } from "@/components/body"

const Education = ({ title_en, slug, title, description, body }) => {
  const router = useRouter()
  const { i18n } = useTranslation()

  const contents = body.find((item) => item.__typename == "ComponentContentContent")

  const experiences = body.filter(
    (item) => item.__typename == "ComponentContentExperience"
  )

  if (!router.isFallback && !slug) return <ErrorPage statusCode={404} />

  return (
    <Layout>
      {router.isFallback ? (
        // TODO: implements this in a better way / more beautiful
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
          <Timeline style={{ marginTop: "4rem" }}>
            {Object.values(experiences).map((experience, i) => (
              <Experience
                key={"experience_" + experience.id}
                last={i == experiences.length - 1}
                {...experience}
              />
            ))}
          </Timeline>
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await getPageBySlug("education", false)

  return {
    props: { ...data?.pages[0] },
    unstable_revalidate: 1,
  }
}

Education.defaultProps = {
  i18nNamespaces: ["common"],
}

Education.propTypes = {
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
  description: PropTypes.objectOf(PropTypes.string).isRequired,
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object),
  slug: PropTypes.string.isRequired,
}

export default Education
