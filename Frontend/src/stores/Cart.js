import { defineStore } from 'pinia'
import api from '@/services/api'

export const useCartStore = defineStore('Cart',{
  state: () => ({
    cartItems: [],
    loading: false,
    error: null
  }),
  getters: {
    totalprice: (state) => {
      return state.cartItems.reduce((sum, item) => {
        return sum + item.price * item.quantity
      }, 0)
    },
    totalItem: (state) => {
      return state.cartItems.length
    }
  },


  actions: {
    async AddToCart (productID, quantity) {
      this.error = null
      try {
        await api.post(`/api/cart/`, { productID, quantity })
        await this.fetchCart()
        console.log(productID, quantity)
        this.loading = false
      } catch (error) {
        this.error = error.response?.data?.message
        this.loading = true
      } 
    },

    async fetchCart () {
      this.loading = true
      this.error = null
      try {
        const res = await api.get(`/api/cart/`)
        this.cartItems = res.data
        console.log(this.cartItems)
      } catch (error) {
        this.error = error.response?.data?.message
        this.loading = true
      }
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },

    async DeleteCart (productID) {
      this.error = null
      try {
        await api.delete(`/api/cart/${productID}`)
        await this.fetchCart()
      } catch (error) {
        this.error = error.response?.data?.message
        this.loading = true
      }
    }
  }
})
