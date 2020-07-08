import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Container from './components/Container';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';

const App = () => {
  return (
    <Container>
      <Header />
      <Main>
        <Switch>

          <Route path='/login'>
            <LoginPage />
          </Route>

          <Route path='/'>
            <MainPage />
          </Route>

        </Switch>
      </Main>
      <Footer />
    </Container>
  );
};

export default App;
