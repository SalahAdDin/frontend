import fetchAPI from "lib/api/utils"

export async function getPageAndTagBySlug(pageSlug, tagSlug) {
  const data = await fetchAPI(
    `query PageBySlug($where: JSON, $where_tag: JSON) {
      pages(where: $where, publicationState: LIVE) {
        title_en
        title {
          title_es
          title_tr
        }
        slug
        description {
          description_en
          description_es
          description_tr
        }
        body {
          __typename
          ... on ComponentContentContent {
            content_en
            content_es
            content_es
          }
          __typename
          ... on ComponentContentExperience {
            id
            from
            to
            ongoing
            title
            institution
            address {
              address
              city
              country
              postalcode
            }
            url
            description{
              content_en
              content_es
              content_tr
            }
          }
          __typename
          ... on ComponentContentPersonalInformation {
            name
            photo {
              alternativeText
              caption
              url
              width
              height
            }
            position
            nationality
            address {
              address
              city
              country
              postalcode
            }
            telephone {
              id
              type
              number
            }
            mail
            links {
              id
              type
              url
            }
            aboutme {
              content_en
              content_es
              content_tr
            }
          }
          __typename
          ... on ComponentFieldsSkill {
            type
            id
            name
            level
          }
        }
        tags{
          id
          label
          slug
        }
      }
      tags(where: $where_tag, publicationState: LIVE){
        id
        label
        slug
        pages(sort: "updated_at:desc"){
          id
          slug
          title_en
          title{
            title_es
            title_tr
          }
          thumbnail {
            alternativeText
            caption
            url
            width
            height
          }
          description{
            description_en
            description_es
            description_tr
          }
          tags{
            id
            label
            slug
          }          
        }
      }
    }`,
    {
      variables: {
        where: { slug: pageSlug },
        where_tag: { slug: tagSlug },
      },
    }
  )

  return data
}

export async function getTagBySlug(slug) {
  const data = await fetchAPI(
    `query TagBySlug($where: JSON){
      tags(where: $where, publicationState: LIVE){
        id
        label
        slug
        
        pages(sort: "updated_at:desc"){
          id
          slug
          title_en
          title{
            title_es
            title_tr
          }
          thumbnail {
            alternativeText
            caption
            url
            width
            height
          }
          description{
            description_en
            description_es
            description_tr
          }
          tags{
            id
            label
            slug
          }          
        }
        projects(sort: "updated_at:desc"){
          id
          title_en
          title{
            title_es
            title_tr
          }
          thumbnail{
            alternativeText
            caption
            url
            width
            height
          }
          description{
            description_en
            description_es
            description_tr
          }
          tags{
            id
            label
            slug
          }
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
