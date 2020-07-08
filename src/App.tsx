import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SiteContainer from './components/SiteContainer';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';

const App = () => {
  return (
    <SiteContainer>
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
    </SiteContainer>
  );
};

export default App;
