import PropTypes from "prop-types"
import ReactPlayer from "react-player/lazy"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { fade, makeStyles } from "@material-ui/core"
import VideoPlugin from "lib/remarkvideo"
import Picture from "../fields/image"
// import RemarkMathPlugin from "remark-math"
// import { BlockMath, InlineMath } from "react-katex"

import oceanic from "styles/material-oceanic"

const useStyles = makeStyles((theme) => ({
  codeBlock: {
    "&::-webkit-scrollbar": {
      // display: "none",
      background: fade(theme.palette.light.main, 0.1),
    },
    "&::-webkit-scrollbar-track-piece": {
      display: "none",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: fade(theme.palette.dark.main, 0.5),
    },
  },
  image: {
    position: "relative",
    margin: "auto",
    [theme.breakpoints.down("xs")]: {
      // width: 400,
      height: 200,
    },
    [theme.breakpoints.between("sm", "sm")]: {
      // width: 700,
      height: 500,
    },
    [theme.breakpoints.up("md")]: {
      // width: 800,
      height: 600,
    },
  },
}))

const CodeBlock = ({ language, value }) => {
  const classes = useStyles()

  return (
    <SyntaxHighlighter
      showLineNumbers
      startingLineNumber={1}
      language={language}
      style={oceanic}
      lineNumberContainerProps={{
        style: { color: "#ddd", paddingRight: "1.625em", float: "left" },
      }}
      wrapLines
      className={classes.codeBlock}
    >
      {value}
    </SyntaxHighlighter>
  )
}

CodeBlock.propTypes = {
  language: PropTypes.string,
  value: PropTypes.node,
}

const ImageBlock = ({ alt, src }) => {
  const classes = useStyles()
  return (
    <Picture
      alt={alt}
      src={src}
      layout="fill"
      objectFit="contain"
      quality={80}
      className={classes.image}
    />
  )
}

ImageBlock.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
}

/* 
Note: 
  Videos are embedded in the same way than images:
    ![](filename.mp4 filename.mp3)
  Unfortunately, It seems Markdown itself does not detect differences between images or videos, so, it must be done by file extension.

  Or in this way: https://about.gitlab.com/handbook/markdown-guide/#videos
  
  Issue related to https://github.com/rexxars/react-markdown/issues/343

*/

const VideoBlock = ({ url }) => (
  <ReactPlayer url={url} controls playing style={{ margin: "30px auto" }} />
)

VideoBlock.propTypes = {
  url: PropTypes.string,
}

const ParagraphBlock = ({ children }) => {
  const hasMedia = !!children.find(
    (child) =>
      typeof child === "object" &&
      child.key &&
      (!!child.key.match(/image/g) || !!child.key.match(/video/g))
  )
  return hasMedia ? <div>{children}</div> : <p>{children}</p>
}

ParagraphBlock.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
}

const _mapProps = (props) => ({
  ...props,
  escapeHtml: false,
  plugins: [
    // RemarkMathPlugin,
    // RemarkHighlightPlugin,
    VideoPlugin,
  ],
  renderers: {
    ...props.renderers,
    // math: ({ value }) => <BlockMath>{value}</BlockMath>,
    // inlineMath: ({ value }) => <InlineMath>{value}</InlineMath>,
    code: CodeBlock,
    image: ImageBlock,
    video: VideoBlock,
    paragraph: ParagraphBlock,
  },
})

const Content = (props) => <ReactMarkdown {..._mapProps(props)} />

export default Content
