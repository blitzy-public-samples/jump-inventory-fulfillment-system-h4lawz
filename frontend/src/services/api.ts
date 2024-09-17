import axios, { AxiosInstance } from 'axios';
import { getAuthToken } from 'frontend/src/utils/auth';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });

  instance.interceptors.request.use(async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // HUMAN ASSISTANCE NEEDED
      // Add specific error handling logic here
      // For example, handle token expiration, network errors, etc.
      return Promise.reject(error);
    }
  );

  return instance;
};

export const fetchOrders = async (params: object): Promise<Order[]> => {
  const api = createApiInstance();
  const response = await api.get('/orders', { params });
  return response.data;
};

export const updateOrder = async (orderId: string, orderData: object): Promise<Order> => {
  const api = createApiInstance();
  const response = await api.put(`/orders/${orderId}`, orderData);
  return response.data;
};