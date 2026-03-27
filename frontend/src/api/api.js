import axios from 'axios'

// In dev: Vite proxy routes /api -> localhost:8000
// In production: set VITE_API_URL to your deployed backend URL
const BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({ baseURL: BASE_URL, timeout: 10000 })

// Products
export const getProducts = (params) => api.get('/products', { params }).then(r => r.data)
export const getProduct = (id) => api.get(`/products/${id}`).then(r => r.data)

// Categories
export const getCategories = () => api.get('/categories').then(r => r.data)

// Cart
export const getCart = () => api.get('/cart').then(r => r.data)
export const addToCart = (productId, quantity = 1) => api.post('/cart', { productId, quantity }).then(r => r.data)
export const updateCartItem = (id, quantity) => api.put(`/cart/${id}`, { quantity }).then(r => r.data)
export const removeCartItem = (id) => api.delete(`/cart/${id}`).then(r => r.data)

// Orders
export const placeOrder = (data) => api.post('/orders', data).then(r => r.data)
export const getOrders = () => api.get('/orders').then(r => r.data)
export const getOrder = (id) => api.get(`/orders/${id}`).then(r => r.data)

export default api
