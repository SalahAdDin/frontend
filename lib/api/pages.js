import fetchAPI from "lib/api/utils"

export async function getPreviewPageBySlug(slug) {
  const data = await fetchAPI(
    `query PageBySlug($where: JSON){
      pages(where: $where){
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
        pages {
          slug
        }
      }
    `)
  return data?.pages
}

export async function getPageBySlug(slug, preview) {
  const data = await fetchAPI(
    `query PageBySlug($where: JSON){
        pages(where: $where) {
          created_at
          updated_at
          title_en
          title {
            title_es
            title_tr
          }
          slug
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
          body {
            __typename
            ... on ComponentContentContent {
              id
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
              id
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
      }`,
    {
      preview,
      variables: {
        where: {
          slug,
          ...(preview ? {} : { status: "published" }),
        },
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
      pages(where: $where) {
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
