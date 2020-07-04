import PropTypes from "prop-types"
import ErrorPage from "next/error"
import { useRouter } from "next/router"
import Head from "next/head"
import { NextSeo } from "next-seo"
import Skeleton from "@material-ui/lab/Skeleton"
import Layout from "@/components/layout"
import { CMS_NAME } from "@/lib/constants"
import { getAllPagesBySlug, getAllPagesWithSlug } from "@/lib/api"
import { getPageBySlug } from "@/lib/api"

/*
Query for getting personal information:
{
  page(id: 3) {
    body{
      __typename ...on ComponentContentPersonalInformation{
        name
      }
    }
  }
}
 */

const Page = ({ page, preview }) => {
  const router = useRouter()
  // const pageTitle = `${CMS_NAME} | ${page.title}

  if (!router.isFallback && !page?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Layout preview={preview}>
        {/* TODO: It goes in every place with the structure */}
        {router.isFallback ? (
          <Skeleton />
        ) : (
          <>
            {/* <Head>
          <NextSeo
            title={pageTitle}
            description={page.description.description_en}
            // TODO: get url
            // canonical={}
            openGraph={{
              url: "",
              title: page.title,
              description: page.description.description_en,
              // TODO: make a function who handles image from:
              // 1. Personal Information
              // 2. Project
              // 3. How do this for blog?
              images: [
                {
                  url: imageURL,
                  with: imageWidth,
                  height: imageHeight,
                  alt: imageAlt,
                },
              ],
              // TODO: Handle this for about me page.
              // TODO: Function to get first and last name.
              profile: {
                firstName: page.body.name,
                lastName: page.body.name,
              },
              // TODO: Handle it for projects, this just in project.tags
              videos: [
                {
                  name: project.video.name,
                  contentUrl: project.video.url,
                  description: project.video.caption,
                  uploadDate: project.video.created_at,
                  // TODO: get all page.tags labels as an string array
                  tags: [],
                  thumbnailUrls: [project.previewUrl],
                },
              ],
            }}
          />
        </Head> */}

            {page}
          </>
        )}
      </Layout>
    </>
  )
}

Page.propTypes = {
  page: PropTypes.object,
  preview: PropTypes.bool,
}

export default Page

export async function getStaticProps({ params, preview = null }) {
  const data = await getPageBySlug(params.slug, preview)

  return { props: { preview, page: { ...data?.pages[0] } } }
}

export async function getStaticPaths() {
  const allPages = await getAllPagesWithSlug()
  return {
    paths: allPages?.map((page) => `/page/${page.slug}`) || [],
    fallback: true,
  }
}
