const withOffline = require("next-offline");
const withPlugins = require("next-compose-plugins");
const { i18n } = require("./next-i18next.config");
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// })

const nextConfiguration = {
  transformManifest: (manifest) => ["/"].concat(manifest),
  productionBrowserSourceMaps: true,
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
  experimental: {
    optimizeFonts: true,
  },
  i18n,
  images: {
    domains: ["res.cloudinary.com"],
    // loader: "cloudinary",
    // path: "https://cloudinary.com/",
    deviceSizes: [640, 750, 828, 1080],
    imageSizes: [16, 32, 48, 64],
  },
  async rewrites() {
    return [
      {
        source: "/service-worker.js",
        destination: "/_next/static/service-worker.js",
      },
      {
        source: "/service-worker.js.map",
        destination: "/_next/static/service-worker.js.map",
      },
    ];
  },
  /*
  TODO: At remaking on typescript, review which package is broking this.
  future: {
    webpack5: true,
  },*/
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = withPlugins([
  // [withBundleAnalyzer],
  // [withOffline],
  withOffline(nextConfiguration),
]);
