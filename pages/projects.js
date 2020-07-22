import PropTypes from "prop-types"
import { getPageBySlugAndCategory } from "@/lib/api/categories"

function Projects({ title_en, slug, title, description, body, categories }) {
  return <div></div>
}

Projects.propTypes = {
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
  description: PropTypes.objectOf(PropTypes.string).isRequired,
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
  slug: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object),
}

export const getStaticProps = async () => {
  const data = await getPageBySlugAndCategory("projects")
  return { props: { ...data?.pages[0], categories: data?.categories } }
}

export default Projects
