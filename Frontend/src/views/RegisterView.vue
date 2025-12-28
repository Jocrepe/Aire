<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import UserLayout from '@/components/User/UserLayout.vue';
import Loading from '@/components/User/Loading.vue';

import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore()

const router = useRouter()

const email = ref('')
const password = ref('')
const name = ref('')


const Register = async (error) => {
    await authStore.register(email.value, password.value, name.value)
    if (!authStore.error) {
        router.push({name: 'login'})
    }
}
</script>

<template>
    <UserLayout>
        <Loading v-if="authStore.loading"></Loading>
        <div class="w-450 mx-auto">
            <fieldset class="mx-auto my-20 fieldset bg-base-200 border-base-300 rounded-box w-md h-140 border p-10">
                <legend class="fieldset-legend text-3xl">Create Account</legend>

                <div v-if="authStore.error"><p class="text-error text-xl">{{ authStore.error }}</p></div>
                
                <label class="label ">email</label>
                <input type="email" v-model="email" class="input w-full text-xl" placeholder="Email" />

                <label class="label  mt-10">password</label>
                <input type="password" v-model="password" class="input w-full text-xl" placeholder="Password" />

                <label class="label  mt-10">username</label>
                <input type="username" v-model="name" class="input w-full text-xl" placeholder="Username" />

                <button class="btn btn-neutral mt-10" @click="Register()">Create Account</button>
            </fieldset>
        </div>

    </UserLayout>
</template>