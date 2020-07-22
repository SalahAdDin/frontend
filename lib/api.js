async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch API")
  }

  return json.data
}

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
  return data?.allPages
}

export async function getPageBySlug(slug, preview) {
  const data = await fetchAPI(
    `query PageBySlug($where: JSON){
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
              previewUrl
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
          __typename
          ... on ComponentHeaderCategory {
            name
            description{
              description_en
              description_es
              description_tr
            }
            projects {
              id
              title
              description {
                content_en
                content_es
                content_tr
              }
              thumbnail {
                alternativeText
                url
              }
            }
          }
        }
        tags{
          label
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

export async function getPageBySlugAndCategory(slug) {
  const data = await fetchAPI(
    `query PageBySlug($where: JSON){
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
            previewUrl
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
        __typename
        ... on ComponentHeaderCategory {
          name
          description{
            description_en
            description_es
            description_tr
          }
          projects {
            id
            title
            description {
              content_en
              content_es
              content_tr
            }
            thumbnail {
              alternativeText
              url
            }
          }
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
      projects {
        id
        title
        thumbnail {
          alternativeText
          caption
          previewUrl
          width
          height
        }
        description {
          content_en
          content_es
          content_tr
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
            previewUrl
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
        __typename
        ... on ComponentHeaderCategory {
          name
          description{
            description_en
            description_es
            description_tr
          }
          projects {
            id
            title
            description {
              content_en
              content_es
              content_tr
            }
            thumbnail {
              alternativeText
              url
            }
          }
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
      pages{
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
        title
        thumbnail{
          alternativeText
          caption
          previewUrl
          width
          height
        }
        description{
          content_en
          content_es
          content_tr
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
