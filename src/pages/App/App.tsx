import React, { useEffect, useRef, useState } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers/rootReducer';
import { useDispatch } from 'react-redux';
import { setPrevious } from 'reducers/systemReducer';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Notification from 'components/Notification/Notification';
import MainNotLogged from 'pages/MainNotLogged/MainNotLogged';
import Main from 'pages/Main/Main';
import About from 'pages/About/About';
import Login from 'pages/Login/Login';
import Logout from 'pages/Login/Logout';
import Signup from 'pages/Login/Signup';
import UploadPage from 'pages/Upload/Upload';
import MyPhotos from 'pages/MyPhotos/MyPhotos';
import Account from 'pages/Account/Account';
import Photos from 'pages/Photos/Photos';
import Photo from 'pages/Photo/Photo';
import NotFoundAddress from 'components/NotFoundAddress/NotFoundAddress';
import * as Styled from './style';

const App = () => {
  const loginState = useSelector((state: RootState) => state.system);
  const dispatch = useDispatch();
  const location = useLocation();
  const [back, setBack] = useState<boolean>(false);
  const prevLocationRef = useRef<string | undefined>();

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
      <Styled.MainBack picture={back} />

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
              <CSSTransition key={location.key} timeout={timeout} classNames={classNames}>
                <Styled.Main>
                  <Switch location={location}>
                    <Route path="/photos/photo/:id" component={Photo} />
                    <Route path="/photos" component={Photos} />
                    <Route path="/about" component={About} />
                    <Route path="/main" component={Main} />

                    <Route path="/login">
                      {loginState.loggedIn ? <Redirect to="/" /> : <Login />}
                    </Route>

                    <Route path="/signup">
                      {loginState.loggedIn ? <Redirect to="/" /> : <Signup />}
                    </Route>

                    <Route path="/logout">
                      {loginState.loggedIn ? <Logout /> : <Redirect to="/" />}
                    </Route>

                    <Route path="/upload">
                      {loginState.loggedIn ? <UploadPage /> : <Redirect to="/" />}
                    </Route>

                    <Route path="/myphotos">
                      {loginState.loggedIn ? <MyPhotos /> : <Redirect to="/" />}
                    </Route>

                    <Route path="/account">
                      {loginState.loggedIn ? <Account /> : <Redirect to="/" />}
                    </Route>

                    <Route exact path="/">
                      {loginState.loggedIn ? <Redirect to="/main" /> : <MainNotLogged />}
                    </Route>

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
