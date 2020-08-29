import React from 'react';
import ReactDOM from 'react-dom';
import storage from './utils/storage';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  /*split*/
} from '@apollo/client';

import { setContext } from '@apollo/link-context';
//import { getMainDefinition } from '@apollo/client/utilities';
//import { WebSocketLink } from '@apollo/link-ws';

import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyles from './components/Misc/GlobalStyles';

const authLink = setContext((_, { headers }) => {
  const token = storage.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({ uri: '/graphql' });

/*
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: { reconnect: true },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
});
*/

const cache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        photos: {
          // eslint-disable-next-line
          merge(_existing = [], incoming: any[]) {
            return [...incoming];
          },
        },
      },
    },
    Album: {
      fields: {
        photos: {
          // eslint-disable-next-line
          merge(_existing = [], incoming: any[]) {
            return [...incoming];
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Router>
        <GlobalStyles />
        <App />
      </Router>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);
