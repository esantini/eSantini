export const getWeather = (cb) => {
  return fetch('api/weather', {
    accept: 'application/json',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
};

export const setMessage = (message, cb) => {
  return fetch('api/message', {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus)
    .then(cb);
};

export const getCurrentMessage = (cb) => {
  return fetch('api/message', {
    accept: 'application/json',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
};

export const selfUpdate = (key, cb) => {
  return fetch('api/self-update', {
    method: 'POST',
    body: JSON.stringify({ key }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus)
    .then(cb)
    .catch(cb);
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

const parseJSON = (res) => res.json();
