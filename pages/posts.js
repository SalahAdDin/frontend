import PropTypes from "prop-types"
import { getPageAndTagBySlug } from "@/lib/api/tags"

const Posts = ({ title_en, slug, title, description, body, pagesByTag }) => {
  return <div></div>
}

Posts.propTypes = {
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
  description: PropTypes.objectOf(PropTypes.string).isRequired,
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
  slug: PropTypes.string.isRequired,
  pagesByTag: PropTypes.arrayOf(PropTypes.object),
}

export const getStaticProps = async () => {
  const data = await getPageAndTagBySlug("posts", "blog")
  return {
    props: { ...data?.pages[0], pagesByTag: data?.tags[0] },
  }
}

export default Posts
