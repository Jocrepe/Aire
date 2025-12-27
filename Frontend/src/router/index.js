import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeVIew.vue'
import ContactView from '@/views/ContactView.vue'
import AboutView from '@/views/AboutView.vue'
import WomenProductView from '@/views/WomenProductView.vue'
import MenProductView from '@/views/MenProductView.vue'
import KidProductView from '@/views/KidProductView.vue'
import CatProductView from '@/views/CatProductView.vue'
import AdminView from '@/views/admin/AdminView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/women-fashion',
      name: 'women-fashion',
      component: WomenProductView
    },
    {
      path: '/men-fashion',
      name: 'men-fashion',
      component: MenProductView
    },
    {
      path: '/kid-fashion',
      name: 'kid-fashion',
      component: KidProductView
    },
    {
      path: '/cat-products',
      name: 'cat',
      component: CatProductView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }

  ],
})

export default router
