const path = require(`path`);
const { emitter } = require("gatsby/dist/redux");
const component = path.resolve(`./src/templates/work.js`);
let count = 0;
exports.onCreateNode = ({ node, actions }) => {
  if (node && node.internal && node.internal.type === "DatoCmsBlogPost") {
    if (count++ % 100 === 0) {
      console.log(`Page ${count}`);
    }
    actions.createPage({
      path: `/works/${node.slug}`,
      component,
      context: {
        id: node.id,
      },
    });
  }
};

exports.onPreBootstrap = ({ actions }) => {
  emitter.on(`DELETE_NODE`, ({ payload }) => {
    if (
      payload &&
      payload.internal &&
      payload.internal.type === `DatoCmsBlogPost`
    ) {
      actions.deletePage({
        path: `/works/${payload.slug}`,
        component,
      });
    }
  });
};
