import PropTypes from "prop-types";
import ReactPlayer from "react-player/lazy";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { fade, makeStyles } from "@material-ui/core";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import unwrapImages from "remark-unwrap-images";
import gh from "hast-util-sanitize/lib/github";
import merge from "deepmerge";
import VideoPlugin from "lib/remarkvideo";
import Picture from "../fields/image";
// import RemarkMathPlugin from "remark-math"
// import { BlockMath, InlineMath } from "react-katex"

import oceanic from "styles/material-oceanic";

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
  playerWrapper: {
    position: "relative",
    paddingTop: "56.25%" /* Player ratio: 100 / (1280 / 720) */,
    margin: "30px auto",
  },
  reactPlayer: {
    position: "absolute",
    top: 0,
    left: 0,
  },
}));

const CodeBlock = ({ node, className, ...props }) => {
  const classes = useStyles();
  const match = /language-(\w+)/.exec(className || "");

  return match ? (
    <SyntaxHighlighter
      showLineNumbers
      startingLineNumber={1}
      language={match[1]}
      style={oceanic}
      lineNumberContainerProps={{
        style: { color: "#ddd", paddingRight: "1.625em", float: "left" },
      }}
      wrapLines
      className={classes.codeBlock}
      {...props}
    />
  ) : (
    // TODO: does it require a special class? Find inspiration in other pages.
    <code className={`${className} ${classes.codeBlock}`} {...props} />
  );
};

CodeBlock.propTypes = {
  className: PropTypes.string,
  node: PropTypes.object,
};

const ImageBlock = ({ alt, src }) => {
  const classes = useStyles();
  return (
    <Picture
      alt={alt}
      src={src}
      layout="fill"
      objectFit="contain"
      quality={80}
      className={classes.image}
    />
  );
};

ImageBlock.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
};

/*
Note:
  Videos are embedded in the same way than images:
    ![](filename.mp4 filename.mp3)
  Unfortunately, It seems Markdown itself does not detect differences between images or videos, so, it must be done by file extension.

  Or in this way: https://about.gitlab.com/handbook/markdown-guide/#videos

  Issue related to https://github.com/rexxars/react-markdown/issues/343

*/

const VideoBlock = ({ url }) => {
  const classes = useStyles();
  return (
    <div className={classes.playerWrapper}>
      <ReactPlayer
        className={classes.reactPlayer}
        url={url}
        controls
        playing
        width="100%"
        height="100%"
      />
    </div>
  );
};

VideoBlock.propTypes = {
  url: PropTypes.string,
};

const _mapProps = (props) => ({
  ...props,
  remarkPlugins: [
    // RemarkMathPlugin,
    // RemarkHighlightPlugin,
    unwrapImages,
    VideoPlugin,
  ],
  rehypePlugins: [
    rehypeRaw,
    [rehypeSanitize, merge(gh, { attributes: { code: ["className"] } })],
  ],
  components: {
    ...props.components,
    // math: ({ value }) => <BlockMath>{value}</BlockMath>,
    // inlineMath: ({ value }) => <InlineMath>{value}</InlineMath>,
    code: CodeBlock,
    img: ImageBlock,
    video: VideoBlock,
  },
});

const Content = (props) => <Markdown {..._mapProps(props)} />;

export default Content;
