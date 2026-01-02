<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import UserLayout from '@/components/User/UserLayout.vue';
import Loading from '@/components/User/Loading.vue';
import AddToCart from '@/components/User/AddToCart.vue';

import { useProductStore } from '@/stores/Product';
import { useCartStore } from '@/stores/Cart';
import { useAuthStore } from '@/stores/auth';


const route = useRoute()

const productStore = useProductStore()
const cartStore = useCartStore()
const authStore = useAuthStore()

const isAlert = ref(false)
const quantity = ref(1)

onMounted(() => {
    productStore.fetchProductById(route.params.productID)
})

const HandleAddToCart = async (productID) => {
    if (authStore.isAuth) {
        await cartStore.AddToCart(productID, quantity.value)
        isAlert.value = true
        setTimeout(() => {
            isAlert.value = false
        }, 1000)
    } else {
        router.push({ name: 'login' })
    }
}

</script>

<template>
    <UserLayout>
        <Loading v-if="productStore.loading"></Loading>
        <div v-if="isAlert" class="inset-0 fixed bg-black/85 flex items-center justify-center z-100">
            <div class="p-10 bg-white rounded-xl text-xl ">Added To Cart!</div>
        </div>
        <div class="w-250 mx-auto">
            <div class="border-gray-300 border-b-1 mt-10"></div>
            <div class="flex my-20">
                <div class="w-1/2 rounded-2xl overflow-hidden">
                    <img class="w-200 h-130" :src="'data:image/png;base64,' + productStore.product.image" alt="">
                </div>

                <div class="w-1/2 flex flex-col px-5 justify-between p-3">
                    <div>
                        <div class="text-3xl mb-5">{{ productStore.product.name }}</div>
                        <div class="text-md mb-10">{{ productStore.product.about }}</div>
                        <div class="text-md">{{ productStore.product.reviewScore }} / 5.0</div>
                    </div>
                    <div>
                        <div class="flex flex-row gap-20 justify-between">
                            <div class="text-3xl text-error">{{ productStore.product.price }} $</div>
                            <div class="flex flex-row gap-5">
                                <div>
                                    <fieldset class="fieldset w-15">
                                        <select v-model="quantity" class="select">
                                            <option disabled selected>-</option>
                                            <option v-for="i in [1, 2, 3, 4, 5, 6, 7, 8]">{{ i }}</option>
                                        </select>
                                        <span class="label">Quantity</span>
                                    </fieldset>
                                </div>
                                <button class="btn btn-error w-30"
                                    @click="HandleAddToCart(productStore.product.productID)">
                                    <AddToCart></AddToCart>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="border-gray-300 border-b-1 my-5"></div>

            <div>
                <div class="border p-10 border-gray-300 mb-20">
                    <p class="text-2xl mb-7">Description</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita, cumque. Facilis consequatur
                        molestiae sequi recusandae ipsam voluptate harum eaque, illo soluta minus? Provident eum quo
                        placeat voluptatem fuga error doloremque deleniti eius aspernatur ex voluptatibus, consequatur
                        vero sint quaerat maiores expedita dicta repellat! Maxime similique praesentium molestiae,
                        accusantium quod rerum ipsam quis consequatur velit quasi sequi commodi! Aliquid sequi cumque
                        unde velit suscipit fugit nostrum dolore vero facere, ea adipisci impedit blanditiis explicabo
                        rem veniam. Voluptatibus quae itaque exercitationem saepe minima aliquid ipsa aliquam nisi, ex
                        harum laborum accusamus quo perferendis id necessitatibus quia dolorum nihil neque temporibus
                        nam inventore ad commodi? In sapiente autem non ab facilis alias, voluptate doloribus
                        perferendis hic cumque rerum, quam quo? Voluptas id officiis doloremque adipisci vero, tenetur,
                        quaerat aliquam ipsam quia, beatae delectus?</p>
                    <p class="text-2xl my-7">Packaging & Delivery</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, eius, cumque praesentium vitae
                        rem impedit est rerum, repudiandae dolorum eos nihil voluptatibus porro nulla eligendi qui?
                        Molestiae blanditiis pariatur rerum ducimus amet culpa dolorum, officia qui fugiat magnam. Magni
                        sunt eligendi illum laborum repellendus saepe voluptatem, tenetur velit rem placeat, animi harum
                        nemo debitis temporibus fugiat odit. Accusamus eum non nam nemo, sapiente molestias id et odio
                        vel soluta reprehenderit fugit itaque quisquam rem aut placeat laudantium. Iusto numquam animi
                        corporis earum doloribus nam. Atque error voluptatem itaque libero veritatis magnam, mollitia
                        provident a quia dolorem, dolorum, iusto molestiae culpa?</p>
                </div>
            </div>

            <!-- <div class="w-full text-center">
                <p class="text-2xl mb-5">Popular Products</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt, porro?</p>

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
                                <div @click="HandleFetchByID(i.productID)" class=""><button
                                        class="rounded-full btn btn-error w-full">See Details</button></div>
                            </div>

                        </div>
                    </div>

                </div>

            </div> -->
        </div>
    </UserLayout>
</template>