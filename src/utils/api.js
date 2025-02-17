import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'https://tradecopiersignalsbackend.onrender.com/api',
  // baseURL: 'http://45.8.22.219:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
/*
  NOTE: intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
*/

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      if (localStorage.getItem('token')) {
        localStorage.setItem('expired', true);
      }

      window.localStorage.removeItem('token');

      window.location.href = '/auth/login';
    }
    return Promise.reject(err);
  }
);

export default api;
