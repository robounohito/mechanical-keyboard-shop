import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Head from 'next/head';

const ProductItemStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
`;

const PRODUCT_ITEM_QUERY = gql`
  query PRODUCT_ITEM_QUERY($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
    }
  }
`;

const ProductItem = () => {
  const router = useRouter();
  const { handle } = router.query;
  return (
    <Query
      query={PRODUCT_ITEM_QUERY}
      variables={{ handle }}>
      {({ error, loading, data }) => {
        if (error) return <p>Error: {error.message}</p>;
        if (loading) return <p>Loading...</p>;
        if (!data.productByHandle) return <p>No Item Found for {handle}</p>;
        const item = data.productByHandle;
        return (
          <ProductItemStyles>
            <Head>
              <title>Products | {item.title}</title>
            </Head>
            <div className="details">
              <h2>Viewing {item.title}</h2>
              <p>{item.description}</p>
            </div>
          </ProductItemStyles>
        );
      }}
    </Query>
  );
}

export default ProductItem;
