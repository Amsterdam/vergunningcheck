import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";
import { MockLink } from "@apollo/react-testing";

// use a FragmentManager so we don't need to generate a schema with the
// servers fragments. It uses introspection instead.
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [], // no types provided
    },
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_API_URL,
      credentials: "same-origin",
    }),
  ]),
  cache: new InMemoryCache({ fragmentMatcher }),
});

export default client;

// Only used for testing purposes (see file apps/client/src/utils/test-utils.js)
export const getTestClient = (mocks) =>
  new ApolloClient({
    link: new MockLink(mocks, true),
    cache: new InMemoryCache({ fragmentMatcher }),
  });
