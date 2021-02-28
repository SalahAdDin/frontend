import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { SocialProfileJsonLd } from "next-seo"
import PropTypes from "prop-types"
import PersonalInformation from "components/content/personalinformation"
import Title from "components/fields/title"
import Layout from "components/layout"
import Loader from "components/loader"
import SEO from "components/seo"
import SkillsSection from "components/skillssection"
import { getPageBySlug } from "lib/api/pages"
import { CMS_URL } from "lib/constants"
import ErrorPage from "./_error"

const AboutMe = ({ title_en: titleEn, slug, title, description, body }) => {
  const router = useRouter()
  const { t } = useTranslation()

  const personalInformation = body.find(
    (item) => item.__typename === "ComponentContentPersonalInformation"
  )

  const skills = body
    .filter((item) => item.__typename === "ComponentFieldsSkill")
    .reduce((r, a) => {
      r[a.type] = [...(r[a.type] || []), a]
      return r
    }, {})

  const lastName = personalInformation.name.split(" ").slice(2, 4).join(" ")
  const firstName = personalInformation.name.split(" ").slice(0, 2).join(" ")
  const getGroupName = (group) => t(`skill-type.${group.toLowerCase()}`)

  if (!router.isFallback && !slug) return <ErrorPage statusCode={404} />

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
              type: "profile",
              images: [
                {
                  url: personalInformation.photo.url,
                  width: personalInformation.photo.width,
                  height: personalInformation.photo.height,
                  alt: personalInformation.photo.caption,
                },
              ],
              profile: {
                firstName,
                lastName,
                gender: "male",
              },
            }}
            twitter={{
              image: {
                alt: personalInformation.photo.caption,
              },
            }}
          />
          <SocialProfileJsonLd
            type="Person"
            name={personalInformation.name}
            url={CMS_URL}
            sameAs={personalInformation.links.map((url) => url.url)}
          />
          <Title title={title} title_en={titleEn} />
          <PersonalInformation {...personalInformation} />
          {Object.keys(skills).map((group) => (
            <SkillsSection
              skills={skills[group]}
              group={getGroupName(group)}
              key={`skill_group_${group}`}
            />
          ))}
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await getPageBySlug("about-me", false)

  return {
    props: { ...data?.pages[0] },
    revalidate: 1,
  }
}

// This has a problem at first loading: https://github.com/isaachinman/next-i18next/issues/869#issuecomment-736807376
// AboutMe.defaultProps = {
//   i18nNamespaces: ["skill-type"],
// }

AboutMe.propTypes = {
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
  description: PropTypes.objectOf(PropTypes.string).isRequired,
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object),
  slug: PropTypes.string.isRequired,
  i18nNamespaces: PropTypes.arrayOf(PropTypes.string),
}

export default AboutMe
