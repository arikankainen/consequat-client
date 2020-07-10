const getToken = () => localStorage.getItem('consequat-token');
const setToken = (token: string) => localStorage.setItem('consequat-token', token);
const clearToken = () => localStorage.clearItem('consequat-token');

export default {
  getToken,
  setToken,
  clearToken
};