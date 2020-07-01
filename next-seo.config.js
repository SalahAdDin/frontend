import { CMS_URL, CMS_NAME } from "./lib/constants"

export default {
  canonical: CMS_URL,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: CMS_URL,
    site_name: CMS_NAME,
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
}
