import {onError} from "@apollo/client/link/error";
// import toast from "react-hot-toast";
import {ApolloClient, from, InMemoryCache, makeVar} from "@apollo/client";
import {BatchHttpLink} from "@apollo/client/link/batch-http";
import {loadDevMessages, loadErrorMessages} from "@apollo/client/dev";

export const graphApiConfig = {
    uri: process.env.NEXT_PUBLIC_GRAPH_URI
}
export const needRefreshToken = makeVar(false);

const create = () => {
  if (process.env['NEXT_PUBLIC_ENABLE_DD'] != "true") {  // Adds messages only in a dev environment
    loadDevMessages();
    loadErrorMessages();
  }

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          switch (err?.extensions?.code) {

          }
        }
      }

      if (networkError) console.log(`[Network error]: ${networkError}`);
    }
  );

  const httpLink = new BatchHttpLink({
    uri: graphApiConfig.uri,
    batchMax: 5, // No more than 5 operations per batch
    batchInterval: 100, // Wait no more than 20ms after first batched operation
  })


  const client =  new ApolloClient({
    ssrMode: true,
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache({
      addTypename: false,
      resultCacheMaxSize: 0,
      resultCaching: false,
      canonizeResults: false,
    }),
    queryDeduplication: true,
    defaultOptions: {
      watchQuery: {
        initialFetchPolicy: 'no-cache',
        fetchPolicy: 'no-cache',
        refetchWritePolicy: 'overwrite',
        nextFetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
    assumeImmutableResults: false,
  });


  return client;
}

export default create