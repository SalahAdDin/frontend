import { useState } from "react"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

// import RemarkHighlightPlugin from "remark-highlight.js"
// import RemarkMathPlugin from "remark-math"
// import { BlockMath, InlineMath } from "react-katex"

import oceanic from "@/styles/material-oceanic"

const CodeBlock = ({ language, value }) => (
  <SyntaxHighlighter
    showLineNumbers={true}
    startingLineNumber={1}
    language={language}
    style={oceanic}
    lineNumberContainerProps={{
      style: { color: "#ddd", paddingRight: "1.625em", float: "left" },
    }}
    wrapLines={true}
  >
    {value}
  </SyntaxHighlighter>
)

CodeBlock.propTypes = {
  language: PropTypes.string,
  value: PropTypes.node,
}

const ImageBlock = ({ alt, src }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  const styles = {
    lqip: {
      filter: "blur(10px)",
    },
  }

  // Hide preview when image has loaded.
  if (imageLoaded) {
    styles.lqip.opacity = 0
  }

  return (
    <div className="relative">
      <img
        className="absolute top-0 left-0 z-10 w-full transition-opacity duration-500 ease-in opacity-100"
        src={src + "?lqip"}
        alt={alt}
        style={styles.lqip}
      />

      <img
        className="w-full"
        src={src}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  )
}

ImageBlock.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
}

const _mapProps = (props) => ({
  ...props,
  escapeHtml: false,
  plugins: [
    //RemarkMathPlugin,
    // RemarkHighlightPlugin,
  ],
  renderers: {
    ...props.renderers,
    // math: ({ value }) => <BlockMath>{value}</BlockMath>,
    // inlineMath: ({ value }) => <InlineMath>{value}</InlineMath>,
    code: CodeBlock,
    image: ImageBlock,
  },
})

const Content = (props) => <ReactMarkdown {..._mapProps(props)} />

export default Content
