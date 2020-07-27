import fetchAPI from "@/lib/api/utils"

export async function getPageAndTagBySlug(page_slug, tag_slug) {
  const data = await fetchAPI(
    `query PageBySlug($where: JSON, $where_tag: JSON) {
      pages(where: $where) {
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
      tags(where: $where_tag){
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
        where: { slug: page_slug },
        where_tag: { slug: tag_slug },
      },
    }
  )

  return data
}

export async function getTagBySlug(slug) {
  const data = await fetchAPI(
    `query TagBySlug($where: JSON){
      tags(where: $where){
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
          description{
            description_en
            description_es
            description_tr
          }
        }
        projects{
          id
          title_en
          title
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
