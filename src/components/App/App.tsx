import React, { useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import { SiteContainer, Main, MainContainer } from './style';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Notification from '../Notification/Notification';
import MainPage from '../MainPage/MainPage';
import AboutPage from '../AboutPage/AboutPage';
import LoginPage from '../LoginPage/LoginPage';
import LogoutPage from '../LoginPage/LogoutPage';
import SignupPage from '../LoginPage/SignupPage';
import UploadPage from '../UploadPage/UploadPage';
import MyPhotosPage from '../MyPhotosPage/MyPhotosPage';
import AccountPage from '../AccountPage/AccountPage';
import PhotosPage from '../PhotosPage/PhotosPage';

const App = () => {
  const location = useLocation();
  const [back, setBack] = useState<boolean>(false);

  if (
    location.pathname === '/about' ||
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/'
  ) {
    if (!back) setBack(true);
  } else {
    if (back) setBack(false);
  }

  return (
    <SiteContainer picture={back}>
      <Notification />
      <Header />

      <Main>
        <MainContainer>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>

            <Route path="/signup">
              <SignupPage />
            </Route>

            <Route path="/logout">
              <LogoutPage />
            </Route>

            <Route path="/upload">
              <UploadPage />
            </Route>

            <Route path="/myphotos">
              <MyPhotosPage />
            </Route>

            <Route path="/account">
              <AccountPage />
            </Route>

            <Route path="/photos">
              <PhotosPage />
            </Route>

            <Route path="/about">
              <AboutPage />
            </Route>

            <Route exact path="/">
              <MainPage />
            </Route>

            <Route path="/">{/* TODO: error page */}</Route>
          </Switch>
        </MainContainer>
      </Main>

      <Footer />
    </SiteContainer>
  );
};

export default App;
