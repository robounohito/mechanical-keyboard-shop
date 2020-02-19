import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { endpoint, accessToken } from './config';

function createClient({ headers }) {
  return new ApolloClient({
    link: createHttpLink({
      uri: endpoint,
      headers: {
        ...headers,
        'X-Shopify-Storefront-Access-Token': accessToken,
      }
    }),
    cache: new InMemoryCache(),
  })
  /*   
    
    
    
    
    new ApolloClient({
      uri: endpoint,
      request: operation => {
        operation.setContext({
          fetchOptions: {
            credentials: 'include',
            mode: 'no-cors',
          },
          headers: {
            ...headers,
            'X-Shopify-Storefront-Access-Token': accessToken,
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/graphql',
          },
        });
      },
      clientState: {},
    }); */
}

export default withApollo(createClient);
