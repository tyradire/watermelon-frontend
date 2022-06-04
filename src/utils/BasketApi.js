import { BASE_URL } from './consts';

export const addToBasket = (id) => {
  return fetch(`${BASE_URL}/addtobasket/`+ id, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem('jwt'),
    }
  })
  .then((response) => {
    return checkResponse(response);
  })
}

export const deleteBasketProduct = (id) => {
  return fetch(`${BASE_URL}/deletebasketproduct/` + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem('jwt'),
    }
  })
  .then((response) => {
    return checkResponse(response);
  })
}

export const deleteOnePiece = (id) => {
  return fetch(`${BASE_URL}/deleteonepiece/` + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem('jwt'),
    }
  })
  .then((response) => {
    return checkResponse(response);
  })
}

export const getBasketProducts = () => {
  return fetch(`${BASE_URL}/getbasketproducts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem('jwt'),
    }
  })
  .then((response) => {
    return checkResponse(response);
  })
}

const checkResponse = (response) => {
  return response.ok ? response.json() : Promise.reject(response);
}