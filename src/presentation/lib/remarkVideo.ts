import { Node } from "unist";
import visit from "unist-util-visit";
import type { Image } from "mdast";

const allowedFiletypes: string[] = ["avi", "mp4", "mov", "mkv"];

function remarkVideo() {
  function transformer(tree: Node) {
    visit(tree, "image", (node: Image) => {
      const { url } = node;
      const fileType = url.split(".").pop();

      if (fileType && allowedFiletypes.includes(fileType)) {
        node.data = node.data || {};
        node.data.hName = "video";
      }
    });
  }

  return transformer;
}

export default remarkVideo;
