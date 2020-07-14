import React, { useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import { SiteContainer, Main } from './components/Styles';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Notification from './components/Notification';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import LogoutPage from './components/LoginPage/LogoutPage';
import SignupPage from './components/LoginPage/SignupPage';
import UploadPage from './components/UploadPage/UploadPage';

const App = () => {
  const location = useLocation();
  const [back, setBack] = useState<boolean>(false);
  
  if (
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/'
  ) {
    if (!back) setBack(true);
  }
  else {
    if (back) setBack(false);
  }
  
  return (
    <SiteContainer picture={back}>
      <Notification />
      <Header />

      <Main>
        <Switch>

          <Route path='/login'>
            <LoginPage />
          </Route>

          <Route path='/signup'>
            <SignupPage />
          </Route>

          <Route path='/logout'>
            <LogoutPage />
          </Route>

          <Route path='/upload'>
            <UploadPage />
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
