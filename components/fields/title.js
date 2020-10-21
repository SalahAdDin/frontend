import PropTypes from "prop-types"
import { Typography } from "@material-ui/core"
import { useTranslation } from "../../i18n"

const Title = ({
  title,
  title_en: titleEn,
  component = "h1",
  variant = "h1",
  gutterBottom = false,
  align = "center",
}) => {
  const { i18n } = useTranslation()

  const localizedTitle =
    title[
      Object.keys(title).find((content) => content.split("_")[1] === i18n.language)
    ] || titleEn

  return (
    <Typography
      variant={variant}
      component={component}
      align={align}
      gutterBottom={gutterBottom}
      style={{ marginBottom: 24, wordBreak: "break-word" }}
    >
      {localizedTitle}
    </Typography>
  )
}

Title.propTypes = {
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
  component: PropTypes.elementType,
  variant: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
  gutterBottom: PropTypes.bool,
  align: PropTypes.oneOf(["inherit", "left", "center", "right", "justify"]),
}

export default Title
