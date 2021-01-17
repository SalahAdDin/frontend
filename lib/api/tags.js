import fetchAPI, {
  MainPageContent,
  PageCardContent,
  ProjectCardContent,
} from "lib/api/utils"

export async function getPageAndTagBySlug(pageSlug, tagSlug) {
  return await fetchAPI(
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
}

export async function getTagBySlug(slug) {
  return await fetchAPI(
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
