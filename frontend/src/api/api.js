import axios from 'axios'

// In dev: Vite proxy routes /api -> localhost:8000
// In production: set VITE_API_URL to your deployed backend URL
const BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({ baseURL: BASE_URL, timeout: 55000 })

// Intercept responses — if we get HTML back (Netlify 404 page) instead of JSON,
// convert it to a clean error so React components can handle it gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If no response at all (network error / CORS)
    if (!error.response) {
      console.warn('API unreachable — backend not deployed')
      return Promise.reject(new Error('Backend not available'))
    }
    // If we got HTML instead of JSON (Netlify serving its own 404 page)
    const contentType = error.response.headers?.['content-type'] || ''
    if (contentType.includes('text/html')) {
      console.warn('API returned HTML — backend not deployed')
      return Promise.reject(new Error('Backend not available'))
    }
    return Promise.reject(error)
  }
)

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
