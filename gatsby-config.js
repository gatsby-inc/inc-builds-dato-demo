require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  siteMetadata: {
    title: `Creative Portfolio`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        disableLiveReload: isProd,
        apiToken: process.env.DATO_API_TOKEN
      }
    }
  ]
}
