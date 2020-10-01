import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers/rootReducer';
import storageState from './utils/storageState';
import throttle from 'lodash/throttle';

const persistedState = storageState.loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(
  throttle(() => {
    storageState.saveState(store.getState());
  }, 1000)
);

export default store;
