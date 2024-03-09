import { parseJSON, catchError, checkStatus } from './commonCallbacks';

export const getWeather = (cb) =>
  fetch('api/weather', {
    accept: 'application/json',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(catchError);

export const setMessage = (message, cb) =>
  fetch('api/message', {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus)
    .then(cb)
    .catch(catchError);

export const getCurrentMessage = (cb) =>
  fetch('api/message', {
    accept: 'application/json',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(catchError);
