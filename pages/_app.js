import { useEffect } from "react"
import PropTypes from "prop-types"
import App from "next/app"
import { DefaultSeo } from "next-seo"
import { ThemeProvider, CssBaseline } from "@material-ui/core"
import Footer from "components/footer"
import Meta from "components/meta"
import Nav from "components/nav"
import { getPageTitlesBySlugSet } from "lib/api/pages"
import { CMS_TILE_COLOR, menuLinks } from "lib/constants"
import theme from "styles/theme"
import { appWithTranslation } from "../i18n"
import DefaultSEO from "../next-seo.config"

import "fontsource-dm-sans/400.css"
import "fontsource-dm-sans/500.css"
import "fontsource-dm-sans/700.css"
import "fontsource-nunito/400.css"
import "fontsource-nunito/600.css"
import "fontsource-nunito/700.css"

export function reportWebVitals(metric) {
  if (process.env.NODE_ENV === "development") console.log(metric)
}

const FolioApp = ({ Component, pageProps, navProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyle = document.querySelector("#jss-server-side")

    if (jssStyle) {
      jssStyle.parentElement.removeChild(jssStyle)
    }
  }, [])

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
        ]}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Nav navLinks={navProps} />
        <Component {...pageProps} />
        <Footer navLinks={navProps} />
      </ThemeProvider>
    </>
  )
}

FolioApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape({
    title: PropTypes.objectOf(PropTypes.string),
    title_en: PropTypes.string,
  }),
  navProps: PropTypes.arrayOf(PropTypes.object),
}

FolioApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)

  const navProps = await getPageTitlesBySlugSet(menuLinks.map(({ label }) => label))

  const { defaultProps } = appContext.Component

  return {
    ...appProps,
    navProps,
    pageProps: {
      namespacesRequired: [
        ...(appProps.pageProps.namespacesRequired || []),
        ...(defaultProps?.i18nNamespaces || []),
      ],
    },
  }
}

export default appWithTranslation(FolioApp)
