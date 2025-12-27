<script setup>
import { useProductStore } from '@/stores/Product';
import { useCartStore } from '@/stores/Cart';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import AddToCart from '../AddToCart.vue';
const productStore = useProductStore()
const cartStore = useCartStore()
const authStore = useAuthStore()

const router = useRouter()

const isAlert = ref(false)

const HandleAddToCart = async (productID) => {
  if (authStore.isAuth) {
    await cartStore.AddToCart(productID)
    isAlert.value = true
    setTimeout(() => {
      isAlert.value = false
    }, 1000)
  } else {
    router.push({name: 'login'})
  }
}

</script>

<template>
  <div v-if="isAlert" class="inset-0 fixed bg-black/85 flex items-center justify-center z-100">
    <div class="p-10 bg-white rounded-xl text-xl ">Added To Cart!</div>
  </div>

  <div class="grid grid-cols-4 gap-15">
    <div v-for="i in productStore.products" class="w-full mb-20" :key="i">
      <div class="w-full rounded-xl">
        <img class="w-full h-100" :src="'data:image/png;base64,' + i.image" alt="">
      </div>
      <div class="flex flex-col">
        <div class="pt-5 pb-3 text-xl font-bold h-23">{{ i.name }}</div>
        <div class="h-25">{{ i.about }}</div>
        <div class="pt-5">{{ i.reviewScore }}</div>
        <div class="flex flex-row justify-between">
          <div class="pt-5 text-xl">{{ i.price }} $</div>
          <div @click="HandleAddToCart(i.productID)" class="rounded-full btn btn-outline"><AddToCart></AddToCart></div>
        </div>

      </div>
    </div>

  </div>
</template>
