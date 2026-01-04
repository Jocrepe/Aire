<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import adminSidebarLayout from '@/components/admin/adminSidebarLayout.vue';

import { useAdminProductStore } from '@/stores/admin/adminProduct';

const adminProductStore = useAdminProductStore()
const router = useRouter()

const product = adminProductStore.product

const fileInput = ref(null)
const imageFile = ref(null)
const preview = ref(null)
const isAlert = ref(false)

const triggerUpload = () => {
    fileInput.value.click()
}

const onFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    imageFile.value = file
    preview.value = URL.createObjectURL(file)
}

const name = ref('')
const about = ref('')
const price = ref('')
const reviewScore = ref('')
const category = ref('')

onMounted(async () => {
    name.value = product.name
    about.value = product.about
    price.value = product.price
    reviewScore.value = product.reviewScore
    category.value = product.catagories
})

const UpdateProduct = () => {
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('about', about.value)
    formData.append('price', price.value)
    if (imageFile.value instanceof File) {
        formData.append('image', imageFile.value)
    }
    formData.append('reviewScore', reviewScore.value)
    formData.append('catagories', category.value)
    formData.append('productID', product.productID)

    adminProductStore.UpdateProduct(formData)

    isAlert.value = true
    setTimeout(() => {
        isAlert.value = false
    }, 1000)

    router.push({name: 'admin-product'})
}
</script>

<template>
    <adminSidebarLayout>
        <div v-if="isAlert" class="inset-0 fixed bg-black/85 flex items-center justify-center z-100">
            <div class="p-10 bg-white rounded-xl text-xl ">Product is Updated</div>
        </div>
        <div>
            <a href="" class="text-2xl font-bold">Edit Product ID {{ product.productID }}</a>
        </div>
        <div class="divider"></div>

        <div>
            <div class="w-full grid grid-rows-2 grid-flow-col">

                <div>
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend"><a href="" class="text-xl font-light">Product Name</a></legend>
                        <input v-model="name" type="text" class="input" placeholder="Type here" />
                    </fieldset>
                </div>

                <div>
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend"><a href="" class="text-xl font-light">Product About</a></legend>
                        <textarea v-model="about" class="textarea" placeholder="About"></textarea>
                    </fieldset>
                </div>

                <div>
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend"><a href="" class="text-xl font-light">Product Price</a></legend>
                        <input v-model="price" type="text" class="input" placeholder="Type here" />
                    </fieldset>
                </div>

                <div>
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend"><a href="" class="text-xl font-light">Review Score</a></legend>
                        <input v-model="reviewScore" type="text" class="input" placeholder="Type here" />
                    </fieldset>
                </div>

                <div>
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend"><a href="" class="text-xl font-light">Product Category</a>
                        </legend>
                        <input v-model="category" type="text" class="input" placeholder="Type here" />
                    </fieldset>
                </div>

            </div>
        </div>

        <div class="my-15">
            <a href="" class="text-2xl font-bold">Edit Image</a>
            <img v-if="!preview" class="w-150 h-150  mt-5 border" :src="'data:image/png;base64,' + product.image" alt="">
            <img v-else :src="preview" alt="" class="w-150 h-150 mt-5 border">
            <input type="file" ref="fileInput" name="image" accept="image/png, image/jpeg" @change="onFileChange" hidden />
            <button class="btn btn-sofr w-50 my-10" @click="triggerUpload()">Upload New Image</button>
        </div>

        <div class="w-full flex justify-center"><button @click="UpdateProduct()" class="btn btn-info text-[#fff] w-50">Update Product</button></div>

        <div class="divider mb-50"></div>
    
    </adminSidebarLayout>
</template>