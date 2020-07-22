import fetchAPI from "@/lib/api/utils"

export async function getAllProjectsWithID() {
  const data = fetchAPI(`
      {
        projects{
          id
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
