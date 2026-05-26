import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL + '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nova_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchProducts = (params = {}) => {
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v !== null && v !== undefined));
  return api.get('/products', { params: clean });
};
export const fetchCategories = () => api.get('/products/meta/categories');
export const placeOrder = (data) => api.post('/orders', data);
export const fetchMyOrders = () => api.get('/orders/my');
export const fetchOrderById = (id) => api.get(`/orders/${id}`);
export const fetchAllOrders = (params) => api.get('/orders', { params });
export const updateOrderStatus = (id, status, note) => api.patch(`/orders/${id}/status`, { status, note });
export const deleteOrder = (id) => api.delete(`/orders/${id}`);
export const fetchAdminStats = () => api.get('/orders/admin/stats');
export const createProduct = (data) => api.post('/admin', data);
export const updateProduct = (id, data) => api.patch(`/admin/${id}`, data);
export const deleteProduct = (id) => api.delete(`/admin/${id}`);
export const fetchUsers = () => api.get('/admin/users');
export default api;
