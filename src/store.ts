import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers/rootReducer';
import storageState from './utils/storageState';
import throttle from 'lodash/throttle';
import { initialState as notificationInitialState } from './reducers/notificationReducer';
import { initialState as pictureInitialState } from './reducers/pictureReducer';
import { initialState as systemInitialState } from './reducers/systemReducer';

const persistedState = storageState.loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(
  throttle(() => {
    const state = store.getState();

    const stateToSave = {
      system: systemInitialState,
      notification: notificationInitialState,
      picture: pictureInitialState,
      photoList: state.photoList,
    };

    storageState.saveState(stateToSave);
  }, 1000)
);

export default store;
