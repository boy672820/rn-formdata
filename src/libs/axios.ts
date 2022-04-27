import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8113',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(config => {
  return config;
});
axiosInstance.interceptors.response.use(response => response);

export default axiosInstance;
