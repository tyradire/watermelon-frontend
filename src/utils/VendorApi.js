import { BASE_URL } from './consts';

export const createVendor = ({ name }) => {
  return fetch(`${BASE_URL}/addvendor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  })
  .then((response) => {
    return checkResponse(response);
  })
}

export const getVendors = () => {
  return fetch(`${BASE_URL}/getvendors`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    return checkResponse(response);
  })
}

const checkResponse = (response) => {
  return response.ok ? response.json() : Promise.reject(response);
}