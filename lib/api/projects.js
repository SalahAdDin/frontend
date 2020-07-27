import fetchAPI from "@/lib/api/utils"

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
  const data = await fetchAPI(
    `query Projects($id: ID!){
      project(id: $id){
        id
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
        description {
          description_en
          description_es
          description_tr
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
        tags{
          id
          label
          slug
        }
      }
    }`,
    { variables: { id } }
  )

  return data
}
