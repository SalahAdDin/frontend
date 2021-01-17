import fetchAPI, { ProjectCardContent } from "lib/api/utils"

export async function getAllProjectsWithID() {
  const data = await fetchAPI(`
      {
        projects{
          id
        }
      }
    `)
  return data?.projects
}

export async function getProjectByID(id) {
  return await fetchAPI(
    `${ProjectCardContent}
    query Projects($id: ID!){
      project(id: $id){
        ...ProjectCardContent
        video{
          alternativeText
          caption
          name
          previewUrl
          updated_at
          url
        }
        category{
          name
          slug
        }
        links{
          type
          url
        }
        content{
          content_en
          content_es
          content_tr
        }
      }
    }`,
    { variables: { id } }
  )
}
