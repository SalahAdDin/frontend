import "lazysizes"
import PropTypes from "prop-types"
import Image from "next/image"
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

const Picture = ({ alt, src, className = "", width, height, ...rest }) => {
  const classes = useStyles()
  return (
    <Box style={{ display: "flex", justifyContent: "center" }} className={className}>
      <Image
        className={`lazyload ${classes.blurUp}`}
        alt={alt}
        src={src}
        quality={80}
        width={width}
        height={height}
        {...rest}
      />
    </Box>
  )
}

Picture.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Picture
