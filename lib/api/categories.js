import fetchAPI from "lib/api/utils"

export async function getPageBySlugAndCategory(slug) {
  const data = await fetchAPI(
    `query PageBySlug($where: JSON){
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
      categories {
        id
        slug
        name
        description {
          description_en
          description_es
          description_tr
        }
        projects(sort: "updated_at:desc") {
          id
          title_en
          title {
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
          description {
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

export async function getAllCategoriesWithSlug() {
  const data = await fetchAPI(
    `{
      categories {
        slug
      }
    }
    `
  )
  return data?.categories
}

export async function getCategoryBySlug(slug) {
  const data = await fetchAPI(
    `query CategoryBySlug($where: JSON){
      categories(where: $where){
        slug
        name
        description{
          description_en
          description_es
          description_tr
        }
        projects(sort: "updated_at:desc"){
          id
          title_en
          title {
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
