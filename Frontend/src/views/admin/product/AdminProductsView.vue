<script setup>
import adminSidebarLayout from '@/components/admin/adminSidebarLayout.vue';
import Table from '@/components/admin/Table.vue'
import Loading from '@/components/User/Loading.vue'

import { onMounted } from 'vue';

import { useAdminProductStore } from '@/stores/admin/adminProduct';
import { useAuthStore } from '@/stores/auth';

const adminProductStore = useAdminProductStore()
const authStore = useAuthStore()

onMounted(() => {
    authStore.fetchAuthentication()
    adminProductStore.fetchAllProducts()
})

</script>

<template>
    <adminSidebarLayout>
        <Loading v-if="adminProductStore.loading"></Loading>
        <div class="text-2xl font-bold"><a href="">Products</a></div>
        <div class="divider"></div>

        <div class="overflow-x-auto">
            <Table :headers="['ProductID', 'Name', 'About', 'Price', 'Image', 'Review Score', 'Category']">
                <tr v-for="product in adminProductStore.products">
                    <td>{{ product.productID }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.about }}</td>
                    <td>{{ product.price }}</td>
                    <td><img class="w-10" :src="'data:image/png;base64,' + product.image" alt=""></td>
                    <td>{{ product.reviewScore }}</td>
                    <td>{{ product.catagories }}</td>
                    <td><button class="btn btn-soft btn-primary">Edit</button></td>
                    <td><button class="btn btn-soft btn-primary">Delete</button></td>
                </tr>
            </Table>
        </div>
    </adminSidebarLayout>
</template>