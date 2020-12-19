export default async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
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

export const MainPageContent = `
fragment MainPageContent on Page {
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
      content_tr
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
      description {
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
  tags {
    id
    label
    slug
  }
}`

export const ProjectCardContent = `
fragment ProjectCardContent on Project {
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
  tags {
    id
    label
    slug
  }
}
`

export const PageCardContent = `
fragment PageCardContent on Page {
  slug
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
  tags {
    id
    label
    slug
  }
}
`
