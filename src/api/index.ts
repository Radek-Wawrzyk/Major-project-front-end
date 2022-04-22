import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const request: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  validateStatus: (status: number) => {
    return status >= 200 && status < 300;
  },
});

// Set HTTP header with token
request.interceptors.request.use((config: AxiosRequestConfig) => {
  if (Cookies.get('Token')) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${Cookies.get('Token')}`,
    };

    return config;
  }

  return config;
  },
);

export default request;
