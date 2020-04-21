import React from 'react'
import Slider from 'react-slick'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

export default ({ data }) => {
  const { title, excerpt, descriptionNode } = data.datoCmsBlogPost

  return (
    <Layout>
      <article className="sheet">
        <HelmetDatoCms />
        <div className="sheet__inner">
          <h1 className="sheet__title">{title}</h1>
          <p className="sheet__lead">{excerpt}</p>
          <div className="sheet__gallery">
            <Img fluid={data.datoCmsAsset.fluid} />
          </div>
          <div
            className="sheet__body"
            dangerouslySetInnerHTML={{
              __html: descriptionNode.childMarkdownRemark.html
            }}
          />
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query WorkQuery($id: String!) {
    datoCmsBlogPost(id: { eq: $id }) {
      title
      excerpt
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
    }
    datoCmsAsset(format: { eq: "jpg" }) {
      url
      fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
        ...GatsbyDatoCmsSizes
      }
    }
  }
`
