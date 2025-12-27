<script setup>
import UserLayout from '@/components/User/UserLayout.vue';
import SidebarLayout from '@/components/User/SidebarLayout.vue';
import ProductCard from '@/components/User/card/ProductCard.vue';
import Loading from '@/components/User/Loading.vue';

import { onMounted } from 'vue';
import { useProductStore } from '@/stores/Product';
const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProductsByCatagories('Women')
})
</script>

<template>
  <UserLayout>
    <Loading v-if="productStore.loading"></Loading>

    <div class="w-450 mx-auto flex mb-20">
      <div>
        <SidebarLayout></SidebarLayout>
      </div>
      <div class="">
        <img class="mb-10" src="@/assets/User/womenhero.png" alt="">
        <p class="text-3xl my-10">Women's Fashions</p>
        <ProductCard></ProductCard>
      </div>
    </div>
  </UserLayout>
</template>
