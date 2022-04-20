import axios from 'axios';

const request = axios.create({
  baseURL: 'localhost:3000',
  validateStatus: (status) => {
    return status >= 200 && status < 300;
  },
});

// Set HTTP header with token
request.interceptors.request.use((config) => {
  return config;
  }, (err) => { console.log(err); },
);

export default request;
