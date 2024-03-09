
export const parseJSON = res => res.json();

export const catchError = error => console.error(error);

export const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.error(error);
  throw error;
}
