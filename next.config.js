// const { nextI18NextRewrites } = require("next-i18next/rewrites")
const withOffline = require("next-offline")
const withPlugins = require("next-compose-plugins")
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// })
const optimizedImages = require("next-optimized-images")

const localeSubpaths = {
  en: "en",
  es: "es",
  tr: "tr",
}

const nextConfiguration = {
  transformManifest: (manifest) => ["/"].concat(manifest),
  generateInDevMode: true,
  workboxOpts: {
    swDest: process.env.NEXT_EXPORT
      ? "service-worker.js"
      : "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "https-calls",
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  publicRuntimeConfig: {
    localeSubpaths,
  },
  experimental: {
    optimizeFonts: true,
    productionBrowserSourceMaps: true,
  },
  i18n: {
    locales: ["en", "es", "tr"],
    defaultLocale: "en-US",
  },
  images: {
    domains: ["cloudinary.com"],
    // loader: "cloudinary",
    // path: "https://cloudinary.com/",
  },
  async rewrites() {
    return [
      // ...nextI18NextRewrites(localeSubpaths),
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
}

module.exports = withPlugins([
  // [withBundleAnalyzer],
  [optimizedImages],
  // [withOffline],
  withOffline(nextConfiguration),
])
