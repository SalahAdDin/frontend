import PropTypes from "prop-types"
import { NextSeo } from "next-seo"
import { useTranslation } from "react-i18next"
import { CMS_NAME } from "@/lib/constants"

const SEO = ({ title_en, title, openGraph, description }) => {
  const { i18n } = useTranslation()
  const pageTitle = `${CMS_NAME} | ${
    title[
      Object.keys(title).find((content) => content.split("_")[1] == i18n.language)
    ] || title_en
  }`
  const localDescription =
    description[
      Object.keys(description).find(
        (content) => content.split("_")[1] == i18n.language
      )
    ]

  return (
    <NextSeo
      title={pageTitle}
      description={localDescription}
      // TODO: get url
      // canonical={process.env.BASE_URL}

      openGraph={{
        // TODO: get the url => the the current path with next router
        url: process.env.BASE_URL,
        title: pageTitle,
        description: localDescription,
        ...openGraph,
      }}
    />
  )
}

SEO.propTypes = {
  description: PropTypes.objectOf(PropTypes.string).isRequired,
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
  openGraph: PropTypes.object,
}

export default SEO
