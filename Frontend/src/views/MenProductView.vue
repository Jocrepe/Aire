<script setup>
import UserLayout from '@/components/User/UserLayout.vue';
import SidebarLayout from '@/components/User/SidebarLayout.vue';
import Loading from '@/components/User/Loading.vue';
import ProductCard from '@/components/User/card/ProductCard.vue';

import { onMounted } from 'vue';

import { useProductStore } from '@/stores/Product';

const productStore = useProductStore()

onMounted(async () => {
  await productStore.fetchProductsByCatagories('Men')
})

</script>

<template>
  <UserLayout>
    <div class="w-450 mx-auto flex">
      <Loading v-if="productStore.loading"></Loading>
      <div>
        <SidebarLayout></SidebarLayout>
      </div>
      <div class="">
        <img class="mb-10 w-350 h-145" src="@/assets/User/MenHero.jpg" alt="">
        <p class="text-3xl my-10">Men's Fashions</p>
        <ProductCard></ProductCard>
      </div>



    </div>
  </UserLayout>
</template>
