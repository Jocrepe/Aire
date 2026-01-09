<script setup>
import Loading from './Loading.vue';

import { RouterLink } from 'vue-router';
import { ref, onMounted, handleError } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useCartStore } from '@/stores/Cart';
import { useAuthStore } from '@/stores/auth';
const cartStore = useCartStore()
const authStore = useAuthStore()

import Cart from './Cart.vue';

const route = useRoute()
const router = useRouter()

const activeNavbar = ref('')

const isCartHidden = ref(true)
const isAlert = ref(false)

onMounted(async() => {
  activeNavbar.value = route.name
})

const NavbarMenu = [
  {
    name: 'Home',
    routeName: 'home'
  },
  {
    name: 'Contact',
    routeName: 'contact'
  },
  {
    name: 'About',
    routeName: 'about'
  }
]

const handleCart = () => {
  if (authStore.isAuth) {
    cartStore.fetchCart()
    isCartHidden.value = false
  } else {
    router.push({name: 'login'})
  }
}

const handleDeleteCart = (productID) => {
  cartStore.DeleteCart(productID)
  isAlert.value = true
  setTimeout(() => {
    isAlert.value = false
  }, 1000)
}


const handleLogout = async () => {
  await authStore.logout()
  router.push({ name: 'login' })

}
</script>

<template>
  <!-- cart===================================== -->
  <div v-if="isAlert" class="inset-0 fixed bg-black/85 flex items-center justify-center z-100">
    <div class="p-10 bg-white rounded-xl text-xl ">Deleted!</div>
  </div>

  <div class="fixed inset-0 bg-black/85 z-10 flex items-center justify-center" :class="{ hidden: isCartHidden }">
    <Loading v-if="cartStore.loading || authStore.loading"></Loading>
    <div v-else class="relative rounded-xl w-[1000px] max-h-[500px] bg-white overflow-y-auto flex flex-col">
      <div class="absolute right-10 top-3 text-black cursor-pointer" @click="isCartHidden = true">X</div>
      <div v-if="cartStore.cartItems.length === 0" class="p-20">Cart is Empty</div>
      <div v-else>
        <div v-for="i in cartStore.cartItems"
          class="text-xl flex flex-row p-25 items-center justify-between border border-b-3 border-gray-300">
          <div>
            <img class="w-50 h-50" :src="`data:image/png;base64,${i.image}`" alt="">
          </div>
          <div>
            {{ i.name }}
          </div>
          <div>
            {{ i.price }} $
          </div>
          <div class="flex flex-col">
            <p class="mt-25">Quantity: {{ i.quantity }}</p>
            <button @click="handleDeleteCart(i.productID)" class="btn btn-warning mt-15">Delete</button>
          </div>
        </div>
        <div class="text-center text-4xl p-20">Total : {{ cartStore.totalprice }} $</div>
      </div>
    </div>
  </div>
  <!-- cart===================================== -->



  <div class="flex h-30 border-b-1 border-gray-300 items-center">
    <div class=" ml-30 font-bold">
      <RouterLink to="/"><button class="cursor-pointer btn btn-ghost text-6xl">Aire</button></RouterLink>
    </div>

    <div class="flex ml-130 mr-20 text-xl">
      <div v-for="nav in NavbarMenu" class="w-1/3 mr-20">
        <RouterLink :to="{ name: nav.routeName }"
          :class="nav.routeName === activeNavbar ? 'underline underline-offset-8  cursor-pointer' : 'cursor-pointer text-gray-400'">
          {{ nav.name }}</RouterLink>
      </div>

    </div>

    <div v-if="authStore.isAuth" class="relative btn btn-ghost rounded-full" @click="handleCart()">
      <div v-if="cartStore.totalItem != 0" class="absolute badge badge-ghost bottom-6 left-10">{{ cartStore.totalItem }}
      </div>
      <Cart></Cart>
    </div>


    <div v-if="!authStore.isAuth"
      :class="(route.name === 'login' || route.name === 'register') ? 'hidden ml-10' : 'flex flex-col lg:flex-row ml-10'">
      <RouterLink :to="{ name: 'register' }"><button class="btn btn-error text-[#fff] text-xl w-30 h-13">Sign Up</button></RouterLink>
      <RouterLink :to="{ name: 'login' }"><button class="btn btn-ghost text-xl w-30 h-13">Sign In</button></RouterLink>
    </div>
    <div v-else class="mx-10 dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img alt="avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>

      <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
        <li class="px-3 py-2 text-md opacity-70">
          {{ authStore.user?.email }}
        </li>
        <li>
          <button @click="handleLogout" class="text-error text-sm">
            Logout
          </button>
        </li>
      </ul>
    </div>


    <div class="ml-10 w-50">
      <label class="input h-15">
        <svg class="h-[1em] opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" required placeholder="Search" class="text-xl" />
      </label>
    </div>
  </div>

  <slot></slot>

  <!-- Footer -->
  <div class="w-full bg-black">
    <div class="container mx-auto">
      <footer class="footer sm:footer-horizontal bg-neutral text-neutral-content grid-rows-2 p-10">
        <nav>
          <h6 class="footer-title">Services</h6>
          <a class="link link-hover">Branding</a>
          <a class="link link-hover">Design</a>
          <a class="link link-hover">Marketing</a>
          <a class="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 class="footer-title">Company</h6>
          <a class="link link-hover">About us</a>
          <a class="link link-hover">Contact</a>
          <a class="link link-hover">Jobs</a>
          <a class="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 class="footer-title">Legal</h6>
          <a class="link link-hover">Terms of use</a>
          <a class="link link-hover">Privacy policy</a>
          <a class="link link-hover">Cookie policy</a>
        </nav>
        <nav>
          <h6 class="footer-title">Social</h6>
          <a class="link link-hover">Twitter</a>
          <a class="link link-hover">Instagram</a>
          <a class="link link-hover">Facebook</a>
          <a class="link link-hover">GitHub</a>
        </nav>
        <nav>
          <h6 class="footer-title">Explore</h6>
          <a class="link link-hover">Features</a>
          <a class="link link-hover">Enterprise</a>
          <a class="link link-hover">Security</a>
          <a class="link link-hover">Pricing</a>
        </nav>
        <nav>
          <h6 class="footer-title">Apps</h6>
          <a class="link link-hover">Mac</a>
          <a class="link link-hover">Windows</a>
          <a class="link link-hover">iPhone</a>
          <a class="link link-hover">Android</a>
        </nav>
      </footer>
    </div>
  </div>
  <!-- ====== -->

</template>
