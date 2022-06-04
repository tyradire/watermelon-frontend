import { BASE_URL } from './consts';

export const addLike = (id) => {
  return fetch(`${BASE_URL}/addlike/`+ id, {
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

export const getLikes = () => {
  return fetch(`${BASE_URL}/getlikes`, {
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

export const deleteLike = (id) => {
  return fetch(`${BASE_URL}/deletelike/`+ id, {
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

const checkResponse = (response) => {
  return response.ok ? response.json() : Promise.reject(response);
}