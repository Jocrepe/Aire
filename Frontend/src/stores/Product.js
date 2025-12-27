import { defineStore } from 'pinia'
import api from '@/services/api'


export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    loading: false,
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

          setTimeout(() => {
            this.loading = false
          }, 1000)
      } catch (error) {
          console.error(error)
          this.loading = true
      }

    }
  }

})
