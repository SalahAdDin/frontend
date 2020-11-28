// const { nextI18NextRewrites } = require("next-i18next/rewrites")
const withPlugins = require("next-compose-plugins")
const optimizedImages = require("next-optimized-images")

const localeSubpaths = {
  en: "en",
  es: "es",
  tr: "tr",
}

module.exports = withPlugins([
  [optimizedImages],
  {
    publicRuntimeConfig: {
      localeSubpaths,
    },
    experimental: {
      optimizeFonts: true,
      productionBrowserSourceMaps: true,
      // async rewrites() {
      //   return [...nextI18NextRewrites(localeSubpaths)]
      // },
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/,
        },
        use: ["@svgr/webpack"],
      })

      return config
    },
  },
])
