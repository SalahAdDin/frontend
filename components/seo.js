import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";
import { CMS_NAME } from "lib/constants";

const SEO = ({
  title_en: titleEn,
  title = {},
  openGraph,
  description = {},
  canonical,
}) => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const pageTitle = `${CMS_NAME} | ${
    title[
      Object.keys(title).find((content) => content.split("_")[1] === i18n.language)
    ] || titleEn
  }`;
  const localDescription =
    description[
      Object.keys(description).find(
        (content) => content.split("_")[1] === i18n.language
      )
    ];

  return (
    <NextSeo
      title={pageTitle}
      description={localDescription}
      canonical={process.env.NEXT_PUBLIC_BASE_URL + router.asPath}
      openGraph={{
        type: "website",
        url: canonical || process.env.NEXT_PUBLIC_BASE_URL,
        title: pageTitle,
        description: localDescription,
        ...openGraph,
      }}
    />
  );
};

SEO.propTypes = {
  canonical: PropTypes.string,
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
  openGraph: PropTypes.shape({
    type: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.object),
    videos: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default SEO;
