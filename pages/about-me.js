import PropTypes from "prop-types"
import ErrorPage from "next/error"
import { useRouter } from "next/router"
import Layout from "@/components/layout"
import { Skeleton } from "@material-ui/lab"
import { getPageBySlug } from "@/lib/api"
import { SocialProfileJsonLd, NextSeo } from "next-seo"
import { CMS_URL, CMS_NAME } from "@/lib/constants"
import { Typography } from "@material-ui/core"

const AboutMe = ({ title_en, slug, title, description, body, tags }) => {
  const router = useRouter()
  // TODO: Localize title
  const postTitle = `${CMS_NAME} | ${title || title_en}`

  const personalInformation = body.find(
    (item) => item.__typename == "ComponentContentPersonalInformation"
  )

  const skills = body
    .filter((item) => item.__typename == "ComponentFieldsSkill")
    .reduce((r, a) => {
      r[a.type] = [...(r[a.type] || []), a]
      return r
    }, {})

  const lastName = personalInformation.name.split(" ").slice(2, 4).join(" ")
  const firstName = personalInformation.name.split(" ").slice(0, 2).join(" ")

  if (!router.isFallback && !slug) return <ErrorPage statusCode={404} />

  return (
    <Layout>
      {router.isFallback ? (
        <Skeleton />
      ) : (
        <>
          <NextSeo
            title={postTitle}
            description={description.description_en}
            // TODO: get url
            // canonical={process.env.BASE_URL}

            openGraph={{
              // TODO: get the url => the the current path with next router
              url: process.env.BASE_URL,
              // TODO: localize
              title: title || title_en,
              description: description.description_en,
              images: [
                {
                  url: personalInformation.photo.url,
                  width: personalInformation.photo.width,
                  height: personalInformation.photo.height,
                  alt: personalInformation.photo.caption,
                },
              ],
              profile: {
                firstName: firstName,
                lastName: lastName,
                gender: "male",
              },
            }}
          />
          <SocialProfileJsonLd
            type="Person"
            name={personalInformation.name}
            url={CMS_URL}
            sameAs={personalInformation.links.map((url) => url.url)}
          />
          <Typography variant="h1" component="h1">
            {title_en}
          </Typography>
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await getPageBySlug("about-me", false)
  const { title_en, slug, title, description, body, tags } = data?.pages[0]

  return {
    props: { title_en, slug, title, description, body, tags },
    unstable_revalidate: 1,
  }
}

AboutMe.propTypes = {
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
  description: PropTypes.objectOf(PropTypes.string).isRequired,
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object),
  slug: PropTypes.string.isRequired,
}

export default AboutMe
