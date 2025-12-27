import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false
  }),

  getters: {
    isAuth: (state) => !!state.user
  },

  actions: {
    async fetchAuthentication() {
        this.loading = true
        try {
            const result = await api.get('/api/auth/fetchAuth',)
            this.user = result.data
        } catch (error) {
            this.user = null
        } finally {
            this.loading = false
        }
    },
    async login(email, password) {
        try {
            await api.post('/api/auth/login', {email, password}, )
            await this.fetchAuthentication()
        } catch (error) {
            throw error
        }
    },

    async logout() {
        this.loading = true
        try {
            await api.post('/api/auth/logout', {})
            this.user = null
            console.log('logged out')
        } catch (error) {
            throw error
        } finally {
            this.loading = false
        }
    },

    async register(email, password, name) {
        this.loading = true
        try {
            await api.post('/api/auth/register', {email, password, name})
            console.log('Register complete')
        } catch (error) {
            throw error
        } finally {
            this.loading = false
        }
    }

  }

})
