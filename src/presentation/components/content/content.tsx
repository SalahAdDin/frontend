import { alpha, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import merge from "deepmerge";
import gh from "hast-util-sanitize/lib/github.json";
import Image from "next/image";
import remarkVideo from "presentation/lib/remarkvideo";
import useGlobalStyles from "presentation/styles/common";
import oceanic from "presentation/styles/material-oceanic";
import React from "react";
import ReactMarkdown, { ReactMarkdownOptions } from "react-markdown";
import ReactPlayer from "react-player/lazy";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import unwrapImages from "remark-unwrap-images";
import { Theme } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, palette }: Theme) => ({
  codeBlock: {
    "&::-webkit-scrollbar": {
      // display: "none",
      background: alpha(palette.light.main, 0.1),
    },
    "&::-webkit-scrollbar-track-piece": {
      display: "none",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: alpha(palette.dark.main, 0.5),
    },
  },
  image: {
    position: "relative",
    margin: "auto",
    [breakpoints.down("xs")]: {
      // width: 400,
      height: 200,
    },
    [breakpoints.between("sm", "sm")]: {
      // width: 700,
      height: 500,
    },
    [breakpoints.up("md")]: {
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

const CodeBlock: React.FC<{ className?: string }> = ({ className }) => {
  const classes = useStyles();
  const match: RegExpExecArray | null = /language-(\w+)/.exec(className || "");
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
    />
  ) : (
    <code className={`${className} ${classes.codeBlock}`} />
  );
};

interface IImageBlock {
  src: string;
  alt: string;
  title?: string;
}

const ImageBlock: React.FC<IImageBlock> = ({ alt, src, title }) => {
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  return (
    <Box className={clsx(classes.image, globalClasses.centeredImage)}>
      <Image
        alt={alt}
        src={src}
        quality={80}
        layout="fill"
        objectFit="contain"
        title={title}
      />
    </Box>
  );
};

const VideoBlock: React.FC<{ src: string }> = ({ src }) => {
  const classes = useStyles();
  return (
    <div className={classes.playerWrapper}>
      <ReactPlayer
        className={classes.reactPlayer}
        url={src}
        controls
        playing
        width="100%"
        height="100%"
      />
    </div>
  );
};

const _mapProps = (props: ReactMarkdownOptions): ReactMarkdownOptions => ({
  ...props,
  remarkPlugins: [
    // RemarkMathPlugin,
    // RemarkHighlightPlugin,
    unwrapImages,
    remarkVideo,
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

const Content: React.FC<ReactMarkdownOptions> = (props) => (
  <ReactMarkdown {..._mapProps(props)} />
);

export default Content;
