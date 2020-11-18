import fetchAPI, {
  MainPageContent,
  PageCardContent,
  ProjectCardContent,
} from "lib/api/utils"

export async function getPageAndTagBySlug(pageSlug, tagSlug) {
  const data = await fetchAPI(
    `${MainPageContent}
    ${PageCardContent}
    query PageBySlug($where: JSON, $where_tag: JSON) {
      pages(where: $where, publicationState: LIVE) {
        ...MainPageContent
      }
      posts: pages(
        where: $where_tag
        sort: "updated_at:desc"
        publicationState: LIVE
      ) {
        ...PageCardContent
      }
    }`,
    {
      variables: {
        where: { slug: pageSlug },
        where_tag: {
          tags: {
            slug: tagSlug,
          },
        },
      },
    }
  )

  return data
}

export async function getTagBySlug(slug) {
  const data = await fetchAPI(
    `${PageCardContent}
    ${ProjectCardContent}
    query TagBySlug($where: JSON){
      tags(where: $where, publicationState: LIVE){
        id
        label
        slug
        
        pages(sort: "updated_at:desc"){
          ...PageCardContent         
        }
        projects(sort: "updated_at:desc"){
          ...ProjectCardContent
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

export async function getAllTagsWithSlug() {
  const data = await fetchAPI(`{
    tags {
      slug
    }
  }
  `)
  return data?.tags
}
