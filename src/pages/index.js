import React from "react";
import { Link, graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Img from "gatsby-image";
import Layout from "../components/layout";

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Masonry className="showcase">
      <div className="showcase__item"><h2>1 – 25 of ${data.allDatoCmsBlogPost.totalCount} posts</h2></div>
        {data.allDatoCmsBlogPost.nodes.map(work => (
          <div key={work.id} className="showcase__item">
            <figure className="card">
              <Link to={`/works/${work.slug}`} className="card__image">
                <Img fluid={data.datoCmsAsset.fluid} />
              </Link>
              <figcaption className="card__caption">
                <h6 className="card__title">
                  <Link to={`/works/${work.slug}`}>{work.title}</Link>
                </h6>
                <div className="card__description">
                  <p>
                    {work.excerpt}
                  </p>
                </div>
              </figcaption>
            </figure>
          </div>
        ))}
      </Masonry>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allDatoCmsBlogPost(limit: 25) {
      totalCount
      nodes {
        slug
        title
        id
        excerpt
        descriptionNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    datoCmsAsset(format: { eq: "jpg" }) {
      fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
        ...GatsbyDatoCmsSizes
      }
    }
  }
`;
