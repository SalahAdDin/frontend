import fetchAPI, {
  MainPageContent,
  PageCardContent,
  ProjectCardContent,
} from "lib/api/utils"

export async function getPreviewPageBySlug(slug) {
  const data = await fetchAPI(
    `query PageBySlug($where: JSON){
      pages(where: $where, publicationState: PREVIEW){
        slug
      }
    }`,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  )

  return data?.pages[0]
}

export async function getAllPagesWithSlug() {
  const data = await fetchAPI(`
      {
        pages(publicationState: LIVE) {
          slug
        }
      }
    `)
  return data?.pages
}

export async function getPageBySlug(slug, preview) {
  const data = await fetchAPI(
    `${MainPageContent}
    query PageBySlug($where: JSON, $status: PublicationState){
        pages(where: $where, publicationState: $status) {
          created_at
          updated_at
          thumbnail {
            alternativeText
            caption
            url
            width
            height
          }
          ...MainPageContent
        }
      }`,
    {
      preview,
      variables: {
        where: {
          slug,
        },
        status: preview ? "PREVIEW" : "LIVE",
      },
    }
  )

  return data
}

export async function getPageBySlugAndAdditionalInformation(
  pageSlug,
  tagSlug,
  preview
) {
  const data = await fetchAPI(
    `${MainPageContent}
    ${PageCardContent}
    ${ProjectCardContent}
    query PageBySlugAndAdditionalInformation($where: JSON, $where_tag: JSON, $status: PublicationState){
        pages(where: $where, publicationState: $status) {
          created_at
          updated_at
          thumbnail {
            alternativeText
            caption
            url
            width
            height
          }
          ...MainPageContent
        }
        projects(limit: 3, sort: "updated_at:desc"){
          ...ProjectCardContent
        }
        posts: pages(
          where: $where_tag
          limit: 4
          sort: "updated_at:desc"
          publicationState: LIVE
        ) {
          ...PageCardContent
        }
      }`,
    {
      preview,
      variables: {
        where: {
          slug: pageSlug,
        },
        where_tag: {
          tags: {
            slug: tagSlug,
          },
        },
        status: preview ? "PREVIEW" : "LIVE",
      },
    }
  )

  return data
}

export async function getPageTitleBySlug(slug) {
  const data = await fetchAPI(
    `query PageTitleBySlug($where: JSON){
        pages(where: $where) {
          title_en
          title {
            title_es
            title_tr
          }
        }
      }`,
    {
      variables: {
        where: { slug },
      },
    }
  )

  return data
}

export async function getPageTitlesBySlugSet(slugSet) {
  const data = await fetchAPI(
    `query PageTitleBySlug($where: JSON){
      pages(where: $where, publicationState: LIVE) {
        slug
        title_en
        title {
          title_es
          title_tr
        }
      }
    }`,
    {
      variables: {
        where: { slug_in: slugSet },
      },
    }
  )

  return data?.pages
}
