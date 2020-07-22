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
export async function getAllProjectsWithID() {
  const data = await fetchAPI(`
    {
      projects{
        slug
      }
    }
  `)
  return data?.allProjects
}

export async function getProjectByID(id) {
  const data = await fetchAPI(
    `query Projects($id: ID!){
    project(id: $id){
      id
      title
      thumbnail{
        url
        alternativeText
      }
      link{
        type
        url
      }
      description
      tags{
        label
      }
      video{
        url
        alternativeText
      }
    }
  }`,
    { variables: { id } }
  )

  return data.project
}

export async function getBlogs() {}
