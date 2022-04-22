import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth';

const request: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  validateStatus: (status: number) => {
    return status >= 200 && status < 300;
  },
});

// Set HTTP header with token
request.interceptors.request.use((config: AxiosRequestConfig) => {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${authStore.token}`,
    };

    return config;
  }

  return config;
  },
);

export default request;
