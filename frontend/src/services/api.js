import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (username, email, password) => api.post('/auth/register', { username, email, password }),
  getMe: () => api.get('/auth/me'),
};

export const marketAPI = {
  getStocks: () => api.get('/market/stocks'),
  getStock: (symbol) => api.get(`/market/stocks/${symbol}`),
  getHistory: (symbol, limit = 50) => api.get(`/market/stocks/${symbol}/history?limit=${limit}`),
};

export const tradingAPI = {
  placeOrder: (symbol, type, quantity) => api.post('/trading/orders', { symbol, type, quantity }),
  getPortfolio: () => api.get('/trading/portfolio'),
  getOrders: (limit = 50) => api.get(`/trading/orders?limit=${limit}`),
};

export default api;
