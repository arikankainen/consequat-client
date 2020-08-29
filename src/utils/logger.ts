// eslint-disable-next-line
const log = (...params: Array<any>): void => {
  console.log(...params);
};

// eslint-disable-next-line
const error = (...params: Array<any>): void => {
  console.error(...params);
};

export default {
  log,
  error,
};
