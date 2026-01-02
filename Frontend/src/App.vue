<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue';

import { useAuthStore } from './stores/auth';
import { useCartStore } from './stores/Cart';
import Loading from './components/User/Loading.vue';

const authStore = useAuthStore()
const cartStore = useCartStore()

onMounted(async () => {
  await authStore.fetchAuthentication()
  await cartStore.fetchCart()
})

</script>

<template>
  <Loading v-if="authStore.loading"></Loading>

  <RouterView />
</template>

