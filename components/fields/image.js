import "lazysizes"
import PropTypes from "prop-types"
import { Box, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(() => ({
  blurUp: {
    WebkitFilter: "blur(5px)",
    filter: "blur(5px)",
    transition: "filter 500ms ease-in, -webkit-filter 500ms ease-in",
    "&.lazyloaded": {
      WebkitFilter: "blur(0)",
      filter: "blur(0)",
    },
  },
}))

const Image = ({ alt, src, previewSrc, className = "", ...rest }) => {
  const classes = useStyles()
  return (
    <Box style={{ display: "flex" }} className={className}>
      <img
        className={`lazyload ${classes.blurUp}`}
        alt={alt}
        src={previewSrc}
        data-srcset={src}
        style={{ margin: "auto", width: "100%" }}
        {...rest}
      />
    </Box>
  )
}

Image.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
  previewSrc: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default Image
