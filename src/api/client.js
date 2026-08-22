import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/v1/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 15000,
});

// Attach auth token from localStorage
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('siddhi_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem('siddhi_token');
      localStorage.removeItem('siddhi_user');
    }
    return Promise.reject(err);
  }
);

export default apiClient;
