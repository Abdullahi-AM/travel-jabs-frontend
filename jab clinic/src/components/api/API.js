const API = {};

API.get = (endpoint) => callFetch(endpoint, 'GET');
API.post = (endpoint, record) => callFetch(endpoint, 'POST', record);
API.put = (endpoint, record) => callFetch(endpoint, 'PUT', record);
API.delete = (endpoint) => callFetch(endpoint, 'DELETE');

const callFetch = async (endpoint, method, record = null) => {
  const request = { method };
  if (record) {
    request.body = JSON.stringify(record);
    request.headers = { 'Content-Type': 'application/json' };
  }

  let result = null;
  const response = await fetch(endpoint, request);
  if (response.status !== 204) result = await response.json();

  return response.status >= 200 && response.status < 300
    ? { isSuccess: true, result }
    : { isSuccess: false, message: result.message };
};

export default API;