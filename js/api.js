const fetchData = (url, onSuccess, onError, options = {}) => fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => onSuccess(data))
  .catch((error) => onError(error));

export {fetchData};
