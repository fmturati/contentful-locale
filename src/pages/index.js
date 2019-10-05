import React from "react";
import get from "lodash/get";
import Helmet from "react-helmet";
import Hero from "../components/hero";
import ArticlePreview from "../components/article-preview";

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const posts = get(this, "props.data.allContentfulBlogPost.edges");
    const [author] = get(this, "props.data.allContentfulPerson.edges");
    const main = get(this, "props.data.allContentfulMain.edges");

    return (
      <div style={{ background: "#fff" }}>
        <Helmet title={siteTitle} />
        <Hero data={author.node} />
        <div className="wrapper">
          {main.map(item => {
            return (
              // console.log(main, item);
              <div>
                <h2 className="section-headline">{item.node.headlineTitle}</h2>
                <p className="">{item.node.subHeadline}</p>
              </div>
            );
          })}

          <ul className="article-list">
            {posts.map(({ node }) => {
              return (
                <li key={node.slug}>
                  <ArticlePreview article={node} />
                </li>
              );
            })}
          </ul>
        </div>
        {/* allContentfulBlogPost(sort: {fields: [publishDate], order: DESC }) { */}
      </div>
    );
  }
}

export default RootIndex;

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulBlogPost(filter: { node_locale: { eq: "pt-BR" } }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            sizes(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulPerson(filter: { node_locale: { eq: "pt-BR" } }) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            sizes(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
        }
      }
    }

    allContentfulMain(filter: { node_locale: { eq: "pt-BR" } }) {
      edges {
        node {
          id
          headlineTitle
          subHeadline
        }
      }
    }
  }
`;
