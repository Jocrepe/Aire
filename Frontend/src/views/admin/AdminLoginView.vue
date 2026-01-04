<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth';

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const Login = async () => {
    await authStore.login(email.value, password.value)

    if (authStore.user.role != 'admin') {
        router.push('/')
    }
    
    if (authStore.isAuth) {
        router.push({name: 'admin-product'})
    }
}
</script>

<template >
    <div class="container mx-auto">
        <div class="w-full text-center mt-40">
            <p class="text-6xl font-bold">Aire</p>
            <p class="text-2xl text-gray-500 mt-5">Intelligent Services</p>
        </div>

        <div class="w-full text-center mt-30">
            <p class="text-xl font-bold">Welcome back!</p>
        </div>
        <div>
            <fieldset class="mx-auto mt-10 fieldset bg-base-200 border-base-300 rounded-box w-md h-100 border p-10">
                <legend class="fieldset-legend text-3xl"></legend>
                <div v-if="authStore.error"><p class="text-error text-xl">{{ authStore.error }}</p></div>

                <label class="label ">Email Address</label>
                <input v-model="email" type="email" class="input w-full text-xl" placeholder="Email" />

                <label class="label  mt-10">Password</label>
                <input v-model="password" type="password" class="input w-full text-xl" placeholder="Password" />

                <button @click="Login()" class="btn btn-neutral mt-10">Login</button>
            </fieldset>
        </div>
    </div>
</template>