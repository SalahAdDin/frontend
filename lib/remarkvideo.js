const visit = require("unist-util-visit")

const allowedFiletypes = ["avi", "mp4", "mov", "mkv"]

function video() {
  function transformer(tree) {
    visit(tree, "image", (node) => {
      const fileType = node.url.split(".").pop()

      if (allowedFiletypes.includes(fileType)) node.type = `video`
    })
  }
  return transformer
}

module.exports = video
