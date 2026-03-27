import { create } from 'zustand'
import { getCart, addToCart as apiAddToCart, updateCartItem as apiUpdate, removeCartItem as apiRemove } from '../api/api'

const useCartStore = create((set, get) => ({
  items: [],
  loading: false,
  error: null,

  fetchCart: async () => {
    set({ loading: true, error: null })
    try {
      const items = await getCart()
      set({ items, loading: false })
    } catch (e) {
      set({ loading: false, error: 'Failed to load cart' })
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      await apiAddToCart(productId, quantity)
      await get().fetchCart()
      return { success: true }
    } catch (e) {
      return { success: false, error: e.response?.data?.error || 'Failed to add to cart' }
    }
  },

  updateQuantity: async (itemId, quantity) => {
    try {
      await apiUpdate(itemId, quantity)
      await get().fetchCart()
    } catch (e) {
      console.error('Update failed', e)
    }
  },

  removeItem: async (itemId) => {
    try {
      await apiRemove(itemId)
      set(state => ({ items: state.items.filter(i => i.id !== itemId) }))
    } catch (e) {
      console.error('Remove failed', e)
    }
  },

  get cartCount() { return get().items.reduce((sum, i) => sum + i.quantity, 0) },
  get cartTotal() { return get().items.reduce((sum, i) => sum + parseFloat(i.product.price) * i.quantity, 0) },
  get cartSubtotal() { return get().items.reduce((sum, i) => sum + parseFloat(i.product.mrp) * i.quantity, 0) },
}))

export default useCartStore
