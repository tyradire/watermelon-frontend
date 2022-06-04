import { BASE_URL } from './consts';

export const createProduct = (product) => {
  return fetch(`${BASE_URL}/addproduct`, {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    body: product
  })
  .then((response) => {
    return checkResponse(response);
  })
}

export const getProducts = () => {
  return fetch(`${BASE_URL}/getproducts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    return checkResponse(response);
  })
}

export const getOneProduct = ( id ) => { 
  return fetch(`${BASE_URL}/getone/` + id, {
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