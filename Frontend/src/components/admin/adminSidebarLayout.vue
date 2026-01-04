<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth';

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const activeMenu = ref('')

onMounted(() => {
    activeMenu.value = route.name
})

const SidebarMenus = [
    {
        name: 'Dashboard',
        routeName: 'admin-dashboard'
    },
    {
        name: 'Products',
        routeName: 'admin-product'
    }
]

const Logout = async () => {
    await authStore.logout()
    router.push({name: 'admin-login'})
}
</script>

<template>
    <div class="drawer lg:drawer-open">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content mx-10 mt-10">

            <slot></slot>

        </div>

        <div class="drawer-side">
            <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-base-200 min-h-full w-80 p-4">
                <li class="text-2xl font-bold my-5">Admin Services</li>
                <li class="mb-3">{{ authStore.user.email }}</li>
                <li v-for="menu in SidebarMenus">
                    <RouterLink :to="{ name: menu.routeName }" :class="activeMenu === menu.routeName ? 'text-[#fff] my-3 text-md bg-black': 'text-gray-500 my-2 text-md'">
                        {{ menu.name }}
                    </RouterLink>
                </li>
                <li class="text-gray-500 my-2 text-md "><button @click="Logout()">Log out</button></li>
            </ul>

        </div>
    </div>
</template>