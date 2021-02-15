import axios from 'axios';
import { getAccessToken, getRefreshToken, removeTokens, setAccessToken, } from './TokenHandler';
import config from '../config';

const baseUrl = config.env === 'development' ? 'https://meniu-server-dev.herokuapp.com/api' : 'https://meniu-server.herokuapp.com/api';

//request interceptor to add the auth token header to requests
axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    const refreshToken = getRefreshToken();
    if (refreshToken && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return fetch(`${baseUrl}/token/refresh/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken })
      })
      .then(async (res) => {
        if (res.status === 200) {
          const newData = await res.json();
          setAccessToken(newData.access);
          return axios(originalRequest);
        }
        if (res.status === 401) {
          removeTokens();
          return Promise.reject({'error': 'No tokens found'})
        }
      })
    }
    return Promise.reject(error);
  }
);

//functions to make api calls
const api = {
  login: (body) => {
    return axios.post(`${baseUrl}/v1/token/obtain/`, body);
  },
  refreshToken: (body) => {
    return axios.post(`${baseUrl}/v1/token/refresh/`, body);
  },
  getRestaurants: () => {
    return axios.get(`${baseUrl}/v1/restaurant/`);
  },
  getRestaurantDetail: (id) => {
    return axios.get(`${baseUrl}/v1/restaurant/${id}`);
  },
  getMenuDetail: (id) => {
    return axios.get(`${baseUrl}/v1/menu/${id}/`);
  },
  getDishDetail: (id) => {
    return axios.get(`${baseUrl}/v1/item/${id}/`);
  },
};

export default api;