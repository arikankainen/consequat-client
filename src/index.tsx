import React from 'react';
import ReactDOM from 'react-dom';

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
import GlobalStyles from './components/GlobalStyles';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('consequat-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
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