import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://apiayraj.jdinfotechsolutions.in/v1/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 15000,
});

// Attach auth token from localStorage
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ayraj_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem('ayraj_token');
      localStorage.removeItem('ayraj_user');
    }
    return Promise.reject(err);
  }
);

export default apiClient;
