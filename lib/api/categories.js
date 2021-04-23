import fetchAPI, { MainPageContent, ProjectCardContent } from "lib/api/utils";

export async function getPageBySlugAndCategory(slug) {
  return await fetchAPI(
    `${MainPageContent}
    ${ProjectCardContent}
    query PageBySlug($where: JSON){
      pages(where: $where, publicationState: LIVE) {
        ...MainPageContent
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
          ...ProjectCardContent
        }
      }
    }`,
    {
      variables: {
        where: { slug },
      },
    }
  );
}

export async function getAllCategoriesWithSlug() {
  const data = await fetchAPI(
    `{
      categories {
        slug
      }
    }
    `
  );
  return data?.categories;
}

export async function getCategoryBySlug(slug) {
  return await fetchAPI(
    `${ProjectCardContent}
    query CategoryBySlug($where: JSON){
      categories(where: $where){
        slug
        name
        description{
          description_en
          description_es
          description_tr
        }
        projects(sort: "updated_at:desc"){
          ...ProjectCardContent
        }
      }
    }`,
    {
      variables: {
        where: { slug },
      },
    }
  );
}
