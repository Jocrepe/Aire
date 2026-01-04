import { defineStore } from 'pinia'
import api from '@/services/api'


export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    product: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchProductsByCatagories (catagories) {
      this.loading = true
      this.error = null
      try {
          const res = await api.get('/api/products/', {
            params: {catagories}
          })
          this.products = res.data
      } catch (error) {
          this.error = error.response?.data?.message
          this.loading = true
      } finally {
        this.loading = false
      }
    },

    async fetchProductById (productID) {
      this.loading = true
      this.error = null
      try {
        const res = await api.get(`/api/products/${productID}`)
        this.product = res.data
      } catch(error) {
        this.error = error.response?.data?.message
        this.loading = true
      } finally {
        this.loading = false
      }
    }
  }

})
