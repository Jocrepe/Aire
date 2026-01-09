<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

import { onMounted } from 'vue';
import { useProductStore } from '@/stores/Product';
import { useCartStore } from '@/stores/Cart';

import UserLayout from '@/components/User/UserLayout.vue';
import SidebarLayout from '@/components/User/SidebarLayout.vue';
import ProductCard from '@/components/User/card/ProductCard.vue';
import Loading from '@/components/User/Loading.vue';

const productStore = useProductStore()
const cartStore = useCartStore()

onMounted(() => {
  productStore.fetchProductsByCatagories('BestSelling')
})

</script>

<template>
  <UserLayout>
    <Loading v-if="productStore.loading || cartStore.loading"></Loading>
    <div class="container mx-auto">
      <div class="flex">
        <div>
          <SidebarLayout></SidebarLayout>
        </div>

        <div class="w-[300px] md:w-[1000px] lg:w-[1400px] p-10">
          <Swiper :modules="[Navigation, Autoplay]" :slides-per-view="1" navigation loop autoplay class="h-150">
            <SwiperSlide>
              <img src="@/assets/User/iphone.png" class="w-full h-150" />
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/User/hero2.png" class="w-full h-150" />
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/User/hero3.png" class="w-full h-150" />
            </SwiperSlide>
          </Swiper>

        </div>


      </div>



      <div class="w-full flex flex-col mt-10">
        <div class="flex w-full">
          <div class="w-5 h-10 rounded-md bg-error"></div>

          <div class="flex items-center px-5 text-error text-xl">This Month</div>
        </div>

        <div class="flex w-full justify-between mt-5 mb-12">
          <div class="text-4xl">Best Selling Products</div>
          <div>
            <button class="btn btn-ghost text-xl underline underline-offset-5">View All Product ></button>
          </div>
        </div>

        <div>
          <ProductCard></ProductCard>
        </div>
      </div>

      <div class="w-full mb-30">
        <!-- <ProductCard></ProductCard> -->
      </div>

      <div class="w-full flex flex-col">
        <div class="flex w-full">
          <div class="w-5 h-10 rounded-md bg-error"></div>
          <div class="flex items-center px-5 text-error text-xl">Featured</div>
        </div>
        <div class="flex w-full justify-between mt-5 mb-12">
          <div class="text-4xl">New Arrival</div>
        </div>
      </div>
      <div class="w-full flex gap-10 mb-10">
        <div class="w-1/2"><img src="@/assets/User/ps5.png" alt="" class="w-full cursor-pointer"></div>
        <div class="w-1/2 flex flex-col gap-7">
          <div><img src="@/assets/User/Womencoll.png" alt="" class="w-full cursor-pointer"></div>
          <div class="flex gap-5">
            <img src="@/assets/User/speaker.png" alt="" class="w-full cursor-pointer">
            <img src="@/assets/User/perfume.png" alt="" class="w-full cursor-pointer">
          </div>

        </div>
      </div>

      <div class="w-full flex justify-center py-30">
        <img src="@/assets/User/guarantee.png" alt="">
      </div>

    </div>
  </UserLayout>
</template>
