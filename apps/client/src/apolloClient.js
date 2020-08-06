import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API_URL,
  // credentials: "same-origin", // XXX do we still need this?
  cache: new InMemoryCache(),
});
