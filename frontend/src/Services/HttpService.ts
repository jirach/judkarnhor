import axios from 'axios';

// axios instance for making requests
const httpClient = axios.create();

// request interceptor for adding token
httpClient.interceptors.request.use((config) => {
  // add token to request headers
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default httpClient;
