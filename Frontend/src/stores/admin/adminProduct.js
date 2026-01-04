import { defineStore } from "pinia";
import api from '@/services/api.js'

export const useAdminProductStore = defineStore('AdminProduct', {
    state: () => ({
        products: [],
        error: null,
        loading: false
    }),
    
    actions: {
        async fetchAllProducts () {
            this.loading = true
            this.error = null

            try {
                const res = await api.get('/api/admin/products/')
                this.products = res.data
                console.log(this.products)
            } catch (error) {
                this.error = error.response?.data?.message
            } finally {
                this.loading = false
            }
        }
    }
})