import { getPreviewPageBySlug } from "lib/api/pages";

export default async function preview(req, res) {
  /* 
  
  /api/preview?secret=&route=&slug=

  @ param {string} secret - random string settled down to STRAPI_PREVIEW_SECRET in the environment file
  @ param {string} route - route to the page slug, p.e /posts or empty to /
  @ param {string} slug - page's slug 

  */

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.STRAPI_PREVIEW_SECRET || !req.query.slug) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const page = await getPreviewPageBySlug(req.query.slug);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!page) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `${req.query.route}/${page.slug}` });
  res.end();
}
