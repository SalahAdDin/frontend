import { useEffect } from "react"
import PropTypes from "prop-types"
import App from "next/app"
import { DefaultSeo } from "next-seo"
import { ThemeProvider, CssBaseline } from "@material-ui/core"
import { appWithTranslation } from "i18n"
import Meta from "../components/meta"
import DefaultSEO from "../next-seo.config"
import { getPageTitleBySlug } from "@/lib/api"
import { CMS_TILE_COLOR, CMS_THEME_COLOR, menu_links } from "@/lib/constants"
import Nav from "@/components/nav"

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
      {/* TODO: Add a proper theme */}
      <ThemeProvider>
        <CssBaseline />
        <Nav navLinks={navProps} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

FolioApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  navProps: PropTypes.object,
}

FolioApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)

  let navProps = {}
  menu_links.map(async ({ label }) => {
    const { title, title_en } = await getLocalizedTitle(label)
    navProps[label] = { title, title_en }
  })

  const defaultProps = appContext.Component.defaultProps
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

export async function getLocalizedTitle(slug) {
  const data = await getPageTitleBySlug(slug)
  return { ...data?.pages[0] }
}

export default appWithTranslation(FolioApp)
