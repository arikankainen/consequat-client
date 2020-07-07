import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
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