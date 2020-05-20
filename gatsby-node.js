const path = require(`path`);
const { emitter } = require("gatsby/dist/redux");
const component = path.resolve(`./src/templates/work.js`);

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === "DatoCmsBlogPost") {
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
    if (payload.internal.type === `DatoCmsBlogPost`) {
      actions.deletePage({
        path: `/works/${payload.slug}`,
        component,
      });
    }
  });
};
