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
                if (error.response?.status === '403') {
                    this.error = 'Admin Only'
                }
            } finally {
                this.loading = false
            }
        },
        async AddNewProduct (formData) {
            this.loading = true
            this.error = null
            try {
                await api.post('/api/admin/products/', formData)
            } catch (error) {
                this.error = error.response?.data?.message
            } finally {
                this.loading = false
            }
        },
        async DeleteProduct (productID) {
            this.loading = true
            this.error = null
            try {
                await api.delete(`/api/admin/products/${productID}`)
            } catch (error) {
                this.error = error.response?.data?.message
            } finally {
                this.loading = false
            }
        }
    }
})