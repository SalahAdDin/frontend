import PropTypes from "prop-types"
import { DefaultSeo } from "next-seo"
import Meta from "../components/meta"
import SEO from "../next-seo.config"
import { CMS_TILE_COLOR, CMS_THEME_COLOR } from "../lib/constants"

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Meta />
      <DefaultSeo
        {...SEO}
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

App.propTypes = {
  Component: PropTypes.object,
  pageProps: PropTypes.object,
}

export default App
