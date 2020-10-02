import React, { useEffect, useRef, useState } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { useDispatch } from 'react-redux';
import { setPrevious } from '../../reducers/systemReducer';

import * as Styled from './style';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import Notification from '../../components/Notification/Notification';
import Main from '../Main/Main';
import About from '../About/About';
import Login from '../Login/Login';
import Logout from '../Login/Logout';
import Signup from '../Login/Signup';
import UploadPage from '../Upload/Upload';
import MyPhotos from '../MyPhotos/MyPhotos';
import Account from '../Account/Account';
import Photos from '../Photos/Photos';
import Photo from '../Photo/Photo';
import NotFoundAddress from '../../components/NotFoundAddress/NotFoundAddress';

const App = () => {
  const loginState = useSelector((state: RootState) => state.system);
  const dispatch = useDispatch();
  const location = useLocation();
  const [back, setBack] = useState<boolean>(false);
  const prevLocationRef = useRef<string | undefined>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    prevLocationRef.current = location.pathname;
  });

  useEffect(() => {
    if (
      location.pathname !== '/login' &&
      location.pathname !== '/logout' &&
      location.pathname !== '/signup'
    ) {
      setTimeout(() => {
        dispatch(setPrevious(location.pathname));
      }, 500);
    }
  }, [location.pathname, dispatch]);

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
    <Styled.SiteContainer>
      <Notification />
      <Header />

      <Route
        render={({ location }) => {
          let timeout = { enter: 300, exit: 300 };
          let classNames = 'fade';

          if (
            prevLocationRef.current === location.pathname ||
            location.pathname.toLowerCase().includes('/photos/photo')
          ) {
            timeout = { enter: 0, exit: 0 };
            classNames = 'nofade';
          }

          return (
            <TransitionGroup component={null}>
              <CSSTransition
                key={location.key}
                timeout={timeout}
                classNames={classNames}
              >
                <Styled.Main picture={back}>
                  <Switch location={location}>
                    <Route path="/login">
                      {loginState.loggedIn ? <Redirect to="/" /> : <Login />}
                    </Route>
                    <Route path="/signup">
                      {loginState.loggedIn ? <Redirect to="/" /> : <Signup />}
                    </Route>
                    <Route path="/logout" component={Logout} />
                    <Route path="/upload" component={UploadPage} />
                    <Route path="/myphotos" component={MyPhotos} />
                    <Route path="/account" component={Account} />
                    <Route path="/photos/photo/:id" component={Photo} />
                    <Route path="/photos" component={Photos} />
                    <Route path="/about" component={About} />
                    <Route exact path="/" component={Main} />
                    <Route path="/" component={NotFoundAddress} />
                  </Switch>
                </Styled.Main>
              </CSSTransition>
            </TransitionGroup>
          );
        }}
      />

      <Footer />
    </Styled.SiteContainer>
  );
};

export default App;
