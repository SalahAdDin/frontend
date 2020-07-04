import { getPreviewPageBySlug } from "@/lib/api"

export default async function preview(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.STRAPI_PREVIEW_SECRET || !req.query.slug) {
    return res.status(401).json({ message: "Invalid token" })
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const page = await getPreviewPageBySlug(req.query.slug)

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!page) {
    return res.status(401).json({ message: "Invalid slug" })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  res.writeHead(307, { Location: `/page/${page.slug}` })
  res.end()
}
