import React from 'react';
import ReactDOM from 'react-dom';
import storage from './utils/storage';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/link-context';
import { Provider } from 'react-redux';
import App from './pages/App/App';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles/GlobalStyles';

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
        albums: {
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
    Photo: {
      fields: {
        tags: {
          // eslint-disable-next-line
          merge(_existing = [], incoming: any[]) {
            return [...incoming];
          },
        },
      },
    },
    Query: {
      fields: {
        listPhotos: {
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
