import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import { Typography } from "@material-ui/core"

const Title = ({ title, title_en }) => {
  const { i18n } = useTranslation()

  const localizedTitle =
    title[
      Object.keys(title).find((content) => content.split("_")[1] == i18n.language)
    ] || title_en

  return (
    <Typography variant="h1" component="h1" align="center">
      {localizedTitle}
    </Typography>
  )
}

Title.propTypes = {
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
}

export default Title
