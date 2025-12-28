import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),

  getters: {
    isAuth: (state) => !!state.user
  },

  actions: {
    async fetchAuthentication() {
        this.loading = true
        try {
            const result = await api.get('/api/auth/fetchAuth')
            this.user = result.data
            this.error = null
        } catch (error) {
            this.user = null
        } finally {
            this.loading = false
        }
    },
    async login(email, password) {
        this.error = null
        try {
            await api.post('/api/auth/login', {email, password}, )
            await this.fetchAuthentication()
        } catch (error) {
            this.error = error.response?.data?.message
        }
    },

    async logout() {
        this.loading = true
        this.error = null
        try {
            await api.post('/api/auth/logout', {})
            this.user = null
        } catch (error) {
            this.error = error.response?.data?.message
        } finally {
            this.loading = false
        }
    },

    async register(email, password, name) {
        this.loading = true
        this.error = null
        try {
            await api.post('/api/auth/register', {email, password, name})
        } catch (error) {
            this.error = error.response?.data?.message
        } finally {
            this.loading = false
        }
    }

  }

})
