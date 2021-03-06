import React from 'react';
import ReactDOM from 'react-dom';
import storageToken from 'utils/storageToken';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/link-context';
import { Provider } from 'react-redux';
import App from 'pages/App/App';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyles from 'components/GlobalStyles/GlobalStyles';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';

const authLink = setContext((_, { headers }) => {
  const token = storageToken.getToken();
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
        <ScrollToTop />
        <App />
      </Router>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);
