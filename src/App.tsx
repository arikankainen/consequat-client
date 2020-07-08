import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { SiteContainer, Main } from './components/Styles';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';

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
