// const { nextI18NextRewrites } = require("next-i18next/rewrites")
const withOffline = require("next-offline")
const withPlugins = require("next-compose-plugins")
const optimizedImages = require("next-optimized-images")

const localeSubpaths = {
  en: "en",
  es: "es",
  tr: "tr",
}

module.exports = withPlugins([
  [optimizedImages],
  [
    withOffline,
    {
      workboxOpts: {
        swDest: process.env.NEXT_EXPORT
          ? "service-worker.js"
          : "static/service-worker.js",
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: "NetworkFirst",
            options: {
              cacheName: "offlineCache",
              expiration: {
                maxEntries: 200,
              },
            },
          },
        ],
      },
    },
  ],
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
    async rewrites() {
      return [
        {
          source: "/service-worker.js",
          destination: "/_next/static/service-worker.js",
        },
      ]
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
