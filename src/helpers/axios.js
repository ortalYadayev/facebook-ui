import store from '../store';
import axios from 'axios';

const axiosInstance = axios.create({
  baseUrl: 'localhost:8001/register',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${store.state.token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

const axiosPlugin = {
  install(app) {
    app.config.globalProperties.$axios = axiosInstance;
  },
};

export default axiosPlugin;

export { axiosInstance };
