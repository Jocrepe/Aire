import { defineStore } from 'pinia'
import api from '@/services/api'

export const useCartStore = defineStore('Cart',{
  state: () => ({
    cartItems: [],
    loading: false
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
    async AddToCart (productID) {
      try {
        await api.post('/api/cart/', { productID }, {withCredentials: true})
        await this.fetchCart()
        this.loading = false
      } catch (err) {
        console.error(err)
        this.loading = true
      }
    },

    async fetchCart () {
      this.loading = true
      try {
        const res = await api.get(`/api/cart/`, {withCredentials: true})
        this.cartItems = res.data
        console.log(this.cartItems)
      } catch (err) {
        console.error(err)
        this.loading = true
      }
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },

    async DeleteCart (productID) {
      try {
        await api.delete(`/api/cart/${productID}`, {withCredentials: true})
        await this.fetchCart()
      } catch (err) {
        console.error(err)
        this.loading = true
      }
    }
  }
})
