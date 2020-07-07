import React from 'react';
import MainPage from './components/MainPage';
import TopNavigation from './components/TopNavigation';
import { useSelector } from 'react-redux';
import { RootState } from './reducers/rootReducer';

const App = () => {
  const loginStatus = useSelector((state: RootState) => state.system);
  console.log(loginStatus);

  return (
    <div>
      <TopNavigation />
      <MainPage />
    </div>
  );
}

export default App;
