import { Node } from "unist";
import visit from "unist-util-visit";

const allowedFiletypes: string[] = ["avi", "mp4", "mov", "mkv"];

interface ImageNode extends Node {
  url: string;
}

function video() {
  function transformer(tree: Node) {
    visit(tree, "image", (node: ImageNode) => {
      const { url } = node;
      const fileType: string | undefined = url.split(".").pop();

      if (fileType && allowedFiletypes.includes(fileType)) {
        node.data = node.data || {};
        node.data.hName = "video";
        // TODO: If images already returns a src, next line is not required.
        // node.data.hProperties = { src: node.url };
      }
    });
  }

  return transformer;
}

module.exports = video;
