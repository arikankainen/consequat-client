import { RootState } from 'reducers/rootReducer';

const stateKey = 'app-state';

const loadState = (): RootState | undefined => {
  try {
    const serializedState = localStorage.getItem(stateKey);
    if (serializedState === null) return undefined;

    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(stateKey, serializedState);
  } catch (error) {
    //
  }
};

const removeState = () => {
  try {
    localStorage.removeItem(stateKey);
  } catch (error) {
    //
  }
};

export default {
  loadState,
  saveState,
  removeState,
};
