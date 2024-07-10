import axios from 'axios';
import { redirect } from 'next/navigation';

export const apiClient = axios.create({
  baseURL: '/api',
});

apiClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      redirect('/login');
    }
    return error;
  }
);
