const oceanic = {
  'code[class*="language-"]': {
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    color: "#c3cee3",
    // background: "#263238",
    fontFamily: "Roboto Mono, monospace",
    fontSize: "1em",
    lineHeight: "1.5em",

    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",

    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
  },
  'pre[class*="language-"]': {
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    color: "#c3cee3",
    background: "#263238",
    fontFamily: "Roboto Mono, monospace",
    fontSize: "1em",
    lineHeight: "1.5em",

    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",

    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",

    padding: "1em",
    margin: ".5em 0",
    overflow: "auto",

    msOverflowStyle: "none" /* IE and Edge */,
    scrollbarWidth: "none" /* Firefox */,
  },
  // Next two classes don't work
  'pre[class*="language-"]::-webkit-scrollbar': {
    display: "none",
  },
  'pre[class*="language-"] ::-webkit-scrollbar': {
    display: "none",
  },
  'pre[class*="language-"]::-moz-selection': {
    color: "inherit",
    background: "#363636",
  },
  'pre[class*="language-"] ::-moz-selection': {
    color: "inherit",
    background: "#363636",
  },
  'code[class*="language-"]::-moz-selection': {
    color: "inherit",
    background: "#363636",
  },
  'code[class*="language-"] ::-moz-selection': {
    color: "inherit",
    background: "#363636",
  },
  'pre[class*="language-"]::selection': {
    color: "inherit",
    background: "#363636",
  },
  'pre[class*="language-"] ::selection': {
    color: "inherit",
    background: "#363636",
  },
  'code[class*="language-"]::selection': {
    color: "inherit",
    background: "#363636",
  },
  'code[class*="language-"] ::selection': {
    color: "inherit",
    background: "#363636",
  },
  ':not(pre) > code[class*="language-"]': {
    whiteSpace: "normal",
    padding: ".1em",
    borderRadius: ".2em",
  },
  // 'pre[class*="language-"]': {
  //   overflow: "auto",
  //   position: "relative",
  //   margin: "0.5em 0",
  //   padding: "1.25em 1em",
  // },
  ".language-css>code": {
    color: "#fd9170",
  },
  ".language-sass>code": {
    color: "#fd9170",
  },
  ".language-scss>code": {
    color: "#fd9170",
  },
  '[class*="language-"] .namespace': {
    opacity: 0.7,
  },
  atrule: {
    color: "#c792ea",
  },
  "attr-name": {
    color: "#ffcb6b",
  },
  "attr-value": {
    color: "#c3e88d",
  },
  "attr-value .punctuation": {
    color: "#c3e88d",
  },
  "attr-value .punctuation:first-child": {
    color: "#c3cee3",
  },
  attribute: {
    color: "#c3e88d",
  },
  bold: {
    fontWeight: "bold",
  },
  boolean: {
    color: "#c792ea",
  },
  builtin: {
    color: "#ffcb6b",
  },
  cdata: {
    color: "#80cbc4",
  },
  char: {
    color: "#80cbc4",
  },
  class: {
    color: "#ffcb6b",
  },
  "class-name": {
    color: "#FFC15A",
  },
  color: {
    color: "#f2ff00",
  },
  comment: {
    color: "#789dae",
  },
  constant: {
    color: "#c792ea",
  },
  deleted: {
    color: "#f07178",
  },
  delimiter: {
    color: "#c792ea",
  },
  doctype: {
    color: "#789dae",
  },
  entity: {
    color: "#f07178",
  },
  function: {
    color: "#c792ea",
  },
  hexcode: {
    color: "#f2ff00",
  },
  id: {
    color: "#c792ea",
    fontWeight: "bold",
  },
  important: {
    color: "#c792ea",
    fontWeight: "bold",
  },
  inserted: {
    color: "#80cbc4",
  },
  italic: {
    fontStyle: "italic",
  },
  keyword: {
    color: "#c792ea",
    fontStyle: "italic",
  },
  number: {
    color: "#fd9170",
  },
  operator: {
    color: "#89ddff",
  },
  prolog: {
    color: "#789dae",
  },
  property: {
    color: "#80cbc4",
  },
  "pseudo-class": {
    color: "#c3e88d",
  },
  "pseudo-element": {
    color: "#c3e88d",
  },
  punctuation: {
    color: "#89ddff",
  },
  regex: {
    color: "#f2ff00",
  },
  selector: {
    color: "#f07178",
  },
  string: {
    color: "#c3e88d",
  },
  symbol: {
    color: "#c792ea",
  },
  tag: {
    color: "#f07178",
  },
  "tag .punctuation": {
    color: "#f07178",
  },
  unit: {
    color: "#f07178",
  },
  url: {
    color: "#fd9170",
  },
  variable: {
    color: "#f07178",
  },
  "code.language-css .token.property": {
    color: "#c3cee3",
  },
  "code.language-css .token.property + .token.punctuation": {
    color: "#c3cee3",
  },
  "code.language-css .token.id": {
    color: "#c792ea",
  },
  "code.language-css .token.selector > .token.class": {
    color: "#c792ea",
  },
  "code.language-css .token.selector > .token.attribute": {
    color: "#c792ea",
  },
  "code.language-css .token.selector > .token.pseudo-class": {
    color: "#c792ea",
  },
  "code.language-css .token.selector > .token.pseudo-element": {
    color: "#c792ea",
  },
};

export default oceanic;
