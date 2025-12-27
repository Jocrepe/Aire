<script setup>
import UserLayout from '@/components/User/UserLayout.vue';

</script>

<template>
  <UserLayout>
    <div class="w-450 mx-auto">
      <div class="flex flex-row ml-10 mt-10">
        <p class="text-gray-500">Home /</p>
        <p class="text-black">About</p>
      </div>

      <div class="flex">
        <div class="w-1/2 flex flex-col justify-center items-center p-15">
          <p class="text-7xl mb-10 mt-20">Our Story</p>
          <p class="text-xl">Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an
            active presense in
            Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500
            sallers and 300 brands and serves 3 millioons customers across the region. </p>
          <p class="text-xl mt-10">Exclusive has more than 1 Million products to offer, growing at a very fast.
            Exclusive offers a diverse
            assotment in categories ranging from consumer.</p>
        </div>
        <div class="w-1/2">
          <img src="@/assets/User/abouthero.png" alt="" class="w-full">
        </div>
      </div>

      <div class="w-full flex justify-center py-30 mt-10">
        <img src="@/assets/User/guarantee.png" alt="">
      </div>
    </div>


  </UserLayout>
</template>
