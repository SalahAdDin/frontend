const visit = require("unist-util-visit")

const allowedFiletypes = ["avi", "mp4", "mov", "mkv"]

module.exports = video

function video() {
  return transformer

  function transformer(tree, file) {
    visit(tree, "image", (node) => {
      const fileType = node.url.split(".").pop()

      if (allowedFiletypes.includes(fileType)) node.type = `video`
    })
  }
}
