import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeVIew.vue'
import ContactView from '@/views/ContactView.vue'
import AboutView from '@/views/AboutView.vue'
import WomenProductView from '@/views/WomenProductView.vue'
import MenProductView from '@/views/MenProductView.vue'
import KidProductView from '@/views/KidProductView.vue'
import CatProductView from '@/views/CatProductView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProductView from '@/views/ProductView.vue'

//=======admin========
import AdminLoginView from '@/views/admin/AdminLoginView.vue'
import AdminDashboardView from '@/views/admin/dashboard/AdminDashboardView.vue'
import AdminProductsView from '@/views/admin/product/AdminProductsView.vue'
import AdminAddProductView from '@/views/admin/product/AdminAddProductView.vue'
import AdminEditProduct from '@/views/admin/product/AdminEditProduct.vue'


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
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/product/:productID',
      name: 'product',
      component: ProductView
    },




    //===========admin==============
    {
      path: '/admin-login',
      name: 'admin-login',
      component: AdminLoginView
    },
    {
      path: '/admin-dashboard',
      name: 'admin-dashboard',
      component: AdminDashboardView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin-product',
      name: 'admin-product',
      component: AdminProductsView,
      meta: { requiresAuth: true, requiresAdmin: true }

    },
    {
      path: '/admin-add-product',
      name: 'admin-add-product',
      component: AdminAddProductView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin-edit-product',
      name: 'admin-edit-product',
      component: AdminEditProduct,
      meta: { requiresAuth: true, requiresAdmin: true }
    }

  ],
  scrollBehavior(to, from, savedPosition) {
    // กรณี back / forward
    if (savedPosition) {
      return savedPosition
    }

    // default: ขึ้นบนสุด
    return { top: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  const { useAuthStore } = await import('@/stores/auth')
  const authStore = useAuthStore()

  // ถ้า route ต้อง login
  if (to.meta.requiresAuth) {

    // refresh หน้า แต่ยังไม่มี user → fetch ใหม่
    if (!authStore.user) {
      try {
        await authStore.fetchAuthentication()
      } catch (err) {
        return next({ name: 'admin-login' })
      }
    }

    // ยังไม่ login
    if (!authStore.user) {
      return next({ name: 'admin-login' })
    }

    // ต้องเป็น admin
    if (authStore.user.role !== 'admin') {
      return next({ name: 'home' })
    }
  }

  next()
})


export default router
