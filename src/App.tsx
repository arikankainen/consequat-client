import React from 'react';
import MainPage from './components/MainPage';
import TopNavigation from './components/TopNavigation';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';

const App = () => {
  return (
    <div>
      <TopNavigation />
      <Switch>

        <Route path='/login'>
          <LoginPage />
        </Route>

        <Route path='/'>
          <MainPage />
        </Route>

      </Switch>
    </div>
  );
};

export default App;
