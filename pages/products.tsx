import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Item from "../components/Item";

interface Data {
  collectionByHandle: {
    id: number;
    products: {
      edges: Product[]
    };
  }
}

interface Product {
  node: {
    id: number;
    title: string;
    description: string;
    handle: string;
    images: Image[];
  }
}

interface Image {
  edges: {
    node: {
      transformedSrc: string;
    }
  }
}

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: 500px;
  margin: 0 auto;
`;

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    collectionByHandle(handle: "keyboards") {
      id
      products(first: 15) {
        edges {
          node {
            id
            title
            description
            handle
            images(first: 1) {
              edges {
                node {
                  transformedSrc(maxWidth: 300)
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Products = () => (
  <Query<Data> query={ALL_PRODUCTS_QUERY}>
    {({ data, error, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      const products = data.collectionByHandle.products.edges;
      return (
        <ItemsList>
          {products.map(item => <Item item={item.node} key={item.node.id} />)}
        </ItemsList>
      );
    }}
  </Query>
);

export default Products;