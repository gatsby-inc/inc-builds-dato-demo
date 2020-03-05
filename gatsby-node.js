const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allDatoCmsBlogPost {
        nodes {
          id
          slug
        }
      }
    }
  `);
  console.log(result)

  result.data.allDatoCmsBlogPost.nodes.map(({ id, slug }) => {
    createPage({
      path: `works/${slug}`,
      component: path.resolve(`./src/templates/work.js`),
      context: {
        id
      }
    });
  });
};
