import axios from 'axios';
import { getAccessToken, getRefreshToken, removeTokens, removeUser, setAccessToken, } from './TokenHandler';
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
    if (refreshToken && error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return fetch(`${baseUrl}/v1/token/refresh/`, {
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
          removeUser();
          return Promise.reject({'error': 'No tokens found'})
        }
      })
    }
    return Promise.reject(error);
  }
);

//functions to make api calls
const api = {
  isAuthenticated: () => {
    return axios.get(`${baseUrl}/v1/authenticated `);
  },
  login: (body) => {
    return axios.post(`${baseUrl}/v1/login`, body);
  },
  refreshToken: (body) => {
    return axios.post(`${baseUrl}/v1/token/refresh/`, body);
  },
  getRestaurants: () => {
    return axios.get(`${baseUrl}/v1/restaurant/`);
  },
  getRestaurantDetail: (id = '5236b59c-e618-4ae8-bfc7-4e3a242c5fc9') => {
    return axios.get(`${baseUrl}/v1/restaurant/${id}/`);
  },
  getRestaurantDetailByUser: (id) => {
    return axios.get(`${baseUrl}/v1/restaurant/user/${id}/`);
  },
  getMenuDetail: (id) => {
    return axios.get(`${baseUrl}/v1/menu/${id}/`);
  },
  getDishDetail: (id) => {
    return axios.get(`${baseUrl}/v1/item/${id}/`);
  },
  addRestaurant: (data) => {
    return axios.post(`${baseUrl}/v1/restaurant/`, data)
  },
  editRestaurant: (data, id) => {
    return axios.patch(`${baseUrl}/v1/restaurant/${id}/`, data)
  },
  deleteRestaurant: (id) => {
    return axios.delete(`${baseUrl}/v1/restaurant/${id}/`)
  },
  addCategory: (data) => {
    return axios.post(`${baseUrl}/v1/category/`, data)
  },
  editCategory: (data, id) => {
    return axios.patch(`${baseUrl}/v1/category/${id}/`, data)
  },
  deleteCategory: (id) => {
    return axios.delete(`${baseUrl}/v1/category/${id}/`)
  },
  addItem: (data) => {
    return axios.post(`${baseUrl}/v1/item/`, data)
  },
  editItem: (data, id) => {
    return axios.patch(`${baseUrl}/v1/item/${id}/`, data)
  },
  deleteItem: (id) => {
    return axios.delete(`${baseUrl}/v1/item/${id}/`)
  },
  addMenu: (data) => {
    return axios.post(`${baseUrl}/v1/menu/`, data)
  },
  editMenu: (data, id) => {
    return axios.patch(`${baseUrl}/v1/menu/${id}/`, data)
  },
  deleteMenu: (id) => {
    return axios.delete(`${baseUrl}/v1/menu/${id}/`)
  },
  addImage: (data) => {
    return axios.post(`${baseUrl}/v1/image/`, data)
  },
  editImage: (data, id) => {
    return axios.patch(`${baseUrl}/v1/image/${id}/`, data)
  },
  addOwner: (data) => {
    return axios.post(`${baseUrl}/v1/owner`, data)
  },
  deleteOwner: (id) => {
    return axios.delete(`${baseUrl}/v1/owner/${id}`)
  },
  addBusinessManager: (data) => {
    return axios.post(`${baseUrl}/v1/manager`, data)
  },
  deleteBusinessManager: (id) => {
    return axios.delete(`${baseUrl}/v1/manager/${id}`,)
  },
  editOwner: (data, id) => {
    return axios.patch(`${baseUrl}/v1/owner/${id}/`, data);
  }
};

export default api;