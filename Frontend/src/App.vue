<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue';

import { useAuthStore } from './stores/auth';
import Loading from './components/User/Loading.vue';

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.fetchAuthentication()
})

</script>

<template>
  <Loading v-if="authStore.loading"></Loading>

  <RouterView />
</template>

