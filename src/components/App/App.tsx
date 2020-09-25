import React, { useEffect, useRef, useState } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';

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
import PhotoPage from '../PhotoPage/PhotoPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const App = () => {
  const loginState = useSelector((state: RootState) => state.system);
  const location = useLocation();
  const [back, setBack] = useState<boolean>(false);
  const prevLocationRef = useRef<string | undefined>();

  useEffect(() => {
    prevLocationRef.current = location.pathname;
  });

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

      <Route
        render={({ location }) => {
          let timeout = { enter: 300, exit: 300 };
          let classNames = 'fade';

          if (prevLocationRef.current === location.pathname) {
            timeout = { enter: 0, exit: 0 };
            classNames = 'nofade';
          }

          return (
            <TransitionGroup component={null}>
              <CSSTransition key={location.key} timeout={timeout} classNames={classNames}>
                <Main>
                  <Switch location={location}>
                    <Route path="/login">
                      {loginState.loggedIn ? <Redirect to="/" /> : <LoginPage />}
                    </Route>
                    <Route path="/signup">
                      {loginState.loggedIn ? <Redirect to="/" /> : <SignupPage />}
                    </Route>
                    <Route path="/logout" component={LogoutPage} />
                    <Route path="/upload" component={UploadPage} />
                    <Route path="/myphotos" component={MyPhotosPage} />
                    <Route path="/account" component={AccountPage} />
                    <Route path="/photos/photo/:id" component={PhotoPage} />
                    <Route path="/photos" component={PhotosPage} />
                    <Route path="/about" component={AboutPage} />
                    <Route exact path="/" component={MainPage} />
                    <Route path="/" component={NotFoundPage} />
                  </Switch>
                </Main>
              </CSSTransition>
            </TransitionGroup>
          );
        }}
      />

      <Footer />
    </SiteContainer>
  );
};

export default App;
