const stateKey = 'consequat-token';

const getToken = () => localStorage.getItem(stateKey);
const setToken = (token: string) => localStorage.setItem(stateKey, token);
const removeToken = () => localStorage.removeItem(stateKey);

export default {
  getToken,
  setToken,
  removeToken,
};
