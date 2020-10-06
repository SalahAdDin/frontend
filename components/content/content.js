import PropTypes from "prop-types"
import ReactPlayer from "react-player"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { fade, makeStyles } from "@material-ui/core"

// import RemarkMathPlugin from "remark-math"
// import { BlockMath, InlineMath } from "react-katex"

import oceanic from "@/styles/material-oceanic"
import Image from "../fields/image"

const useStyles = makeStyles((theme) => ({
  codeBlock: {
    // TODO: Add some margin and beautify it
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

const ImageBlock = ({ alt, src }) => (
  <Image alt={alt} src={src} previewSrc={`${src}?lqip`} />
)

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

const VideoBlock = ({ alt, src }) => {
  return <ReactPlayer url={src} controls playing />
}

VideoBlock.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
}

const _mapProps = (props) => ({
  ...props,
  escapeHtml: false,
  plugins: [
    // RemarkMathPlugin,
    // RemarkHighlightPlugin,
  ],
  renderers: {
    ...props.renderers,
    // math: ({ value }) => <BlockMath>{value}</BlockMath>,
    // inlineMath: ({ value }) => <InlineMath>{value}</InlineMath>,
    code: CodeBlock,
    image: ImageBlock,
    video: VideoBlock,
  },
})

const Content = (props) => <ReactMarkdown {..._mapProps(props)} />

export default Content
