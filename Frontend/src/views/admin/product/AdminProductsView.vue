<script setup>
import adminSidebarLayout from '@/components/admin/adminSidebarLayout.vue';
import Table from '@/components/admin/Table.vue'
import Loading from '@/components/User/Loading.vue'

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { useAdminProductStore } from '@/stores/admin/adminProduct';
import { useAuthStore } from '@/stores/auth';

const router = useRouter()

const adminProductStore = useAdminProductStore()
const authStore = useAuthStore()


onMounted(async () => {
    if (!authStore.user) {
        await authStore.fetchAuthentication()
    }

    await adminProductStore.fetchAllProducts()
})

const HandleDeleteProduct = async (productID) => {
    await adminProductStore.DeleteProduct(productID)
    await adminProductStore.fetchAllProducts()
}

const HandleEditProduct = async (productID) => {
    await adminProductStore.GetProduct(productID)
    router.push({name: 'admin-edit-product'})
}
</script>

<template>
    <adminSidebarLayout>
        <Loading v-if="adminProductStore.loading"></Loading>
        <div class="flex flex-row justify-between">
            <a href="" class="text-2xl font-bold">Products</a>
            <RouterLink :to="{name: 'admin-add-product'}"><button class="btn btn-soft btn-neutral">Add New Product</button></RouterLink>
        </div>
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
                    <td><button class="btn btn-soft btn-primary" @click="HandleEditProduct(product.productID)">Edit</button></td>
                    <td><button class="btn btn-soft btn-primary" @click="HandleDeleteProduct(product.productID)">Delete</button></td>
                </tr>
            </Table>
        </div>
    </adminSidebarLayout>
</template>