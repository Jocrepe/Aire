<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/Cart';

import Loading from '@/components/User/Loading.vue';
import UserLayout from '@/components/User/UserLayout.vue';


const authStore = useAuthStore()
const cartStore = useCartStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const Login = async () => {
    await authStore.login(email.value, password.value)

    if (authStore.isAuth) {
        await cartStore.fetchCart()
        router.push({name: 'home'})
    }
}   
</script>

<template>
    <UserLayout>
        <Loading v-if="authStore.loading"></Loading>
        <div class="w-450 mx-auto">  
            <fieldset class="mx-auto my-20 fieldset bg-base-200 border-base-300 rounded-box w-md h-100 border p-10">
                <legend class="fieldset-legend text-3xl">Login now</legend>
                
                <div v-if="authStore.error"><p class="text-error text-xl">{{ authStore.error }}</p></div>
                
                <label class="label ">email</label>
                <input v-model="email" type="email" class="input w-full text-xl" placeholder="Email" />

                <label class="label  mt-10">password</label>
                <input v-model="password" type="password" class="input w-full text-xl" placeholder="Password" />

                <button @click="Login()" class="btn btn-neutral mt-10">Login</button>
            </fieldset>
        </div>

    </UserLayout>
</template>