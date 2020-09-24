import React, { useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import { SiteContainer, Main } from './style';
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
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/logout" component={LogoutPage} />
          <Route path="/upload" component={UploadPage} />
          <Route path="/myphotos" component={MyPhotosPage} />
          <Route path="/account" component={AccountPage} />
          <Route path="/photos" component={PhotosPage} />
          <Route path="/about" component={AboutPage} />
          <Route exact path="/" component={MainPage} />
          <Route path="/">{/* TODO: error page */}</Route>
        </Switch>
      </Main>

      <Footer />
    </SiteContainer>
  );
};

export default App;
