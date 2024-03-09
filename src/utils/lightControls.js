import { parseJSON, catchError, checkStatus } from './commonCallbacks';

export const setLight = (value, cb) =>
  fetch('api/light', {
    method: 'POST',
    body: JSON.stringify({ status: value }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus)
    .then(cb)
    .catch(catchError);

export const getLight = (cb) =>
  fetch('api/light', {
    accept: 'application/json',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(catchError);
