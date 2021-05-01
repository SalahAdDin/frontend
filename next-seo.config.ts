import { CMS_NAME, CMS_URL } from "domain/constants";

export default {
  canonical: CMS_URL,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: CMS_URL,
    site_name: CMS_NAME,
  },
  twitter: {
    creator: "@creator",
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};
