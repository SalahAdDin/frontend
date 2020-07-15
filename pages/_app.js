import PropTypes from "prop-types"
import App from "next/app"
import { DefaultSeo } from "next-seo"
import Meta from "../components/meta"
import DefaultSEO from "../next-seo.config"
import { CMS_TILE_COLOR, CMS_THEME_COLOR } from "../lib/constants"
import { appWithTranslation } from "i18n"

const FolioApp = ({ Component, pageProps }) => {
  return (
    <>
      <Meta />
      <DefaultSeo
        {...DefaultSEO}
        additionalMetaTags={[
          {
            name: "msapplication-TileColor",
            content: CMS_TILE_COLOR,
          },
          {
            name: "msapplication-config",
            content: "/favicon/browserconfig.xml",
          },
          {
            name: "theme-color",
            content: CMS_THEME_COLOR,
          },
        ]}
      />
      <Component {...pageProps} />
    </>
  )
}

FolioApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
}

FolioApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const defaultProps = appContext.Component.defaultProps
  return {
    ...appProps,
    pageProps: {
      namespacesRequired: [
        ...(appProps.pageProps.namespacesRequired || []),
        ...(defaultProps?.i18nNamespaces || []),
      ],
    },
  }
}

export default appWithTranslation(FolioApp)
