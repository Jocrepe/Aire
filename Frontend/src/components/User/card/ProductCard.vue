<script setup>
import { useProductStore } from '@/stores/Product';
import { useCartStore } from '@/stores/Cart';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const productStore = useProductStore()
const authStore = useAuthStore()

const router = useRouter()

const isAlert = ref(false)


const HandleFetchByID = (productID) => {
  if (authStore.isAuth) {
    router.push({name: 'product', params: { productID }})
  } else {
    router.push({name: 'login'})
  }
}

</script>

<template>
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
          <div @click="HandleFetchByID(i.productID)" class=""><button class="rounded-full btn btn-error w-full">See Details</button></div>
        </div>

      </div>
    </div>

  </div>
</template>
