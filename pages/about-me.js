import PropTypes from "prop-types"
import ErrorPage from "next/error"
import { useRouter } from "next/router"
import { SocialProfileJsonLd, NextSeo } from "next-seo"
import { useTranslation } from "react-i18next"
import { makeStyles, Typography } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { getPageBySlug } from "@/lib/api"
import { CMS_URL, CMS_NAME } from "@/lib/constants"
import Layout from "@/components/layout"
import PersonalInformation from "@/components/content/personalinformation"
import SkillSection from "@/components/skillsection"

const useStyles = makeStyles((theme) => ({}))

const AboutMe = ({ title_en, slug, title, description, body }) => {
  const classes = useStyles()
  const router = useRouter()
  const { t, i18n } = useTranslation()

  const postTitle = `${CMS_NAME} | ${
    title[
      Object.keys(title).find((content) => content.split("_")[1] == i18n.language)
    ] || title_en
  }`

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
  const getGroupName = (group) => t("skill-type:" + group.toLowerCase())

  if (!router.isFallback && !slug) return <ErrorPage statusCode={404} />

  return (
    <Layout>
      {router.isFallback ? (
        // TODO: implements this in a better way / more beautiful
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
              title: postTitle,
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
          <Typography variant="h1" component="h1" align="center">
            {title_en}
          </Typography>
          <PersonalInformation personalInformation={personalInformation} />
          {Object.keys(skills).map((group) => (
            <SkillSection
              skills={skills[group]}
              group={getGroupName(group)}
              key={"skill_group_" + group}
            />
          ))}
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await getPageBySlug("about-me", false)
  const { title_en, slug, title, description, body } = data?.pages[0]

  return {
    props: { title_en, slug, title, description, body },
    unstable_revalidate: 1,
  }
}

AboutMe.defaultProps = {
  i18nNamespaces: ["skill-type"],
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
