<script setup>
import { ref } from 'vue'
import axios, { Axios } from 'axios'

const name = ref('')
const productID = ref('')
const about = ref('')
const price = ref('')
const reviewScore = ref('')
const catagories = ref('')

const fileInput = ref(null)
const imageFile = ref(null)
const preview = ref(null)

const triggerUpload = () => {
    fileInput.value.click()
}

const onFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    imageFile.value = file
    preview.value = URL.createObjectURL(file)
}

const postData = async () => {
    const formData = new FormData()

    formData.append('name', name.value)
    formData.append('about', about.value)
    formData.append('price', price.value)
    formData.append('reviewScore', reviewScore.value)
    formData.append('catagories', catagories.value)
    formData.append('image', imageFile.value)
    await axios.post('http://localhost:8000/admin', formData)
    name.value = ''
    about.value = ''
    price.value = ''
    reviewScore.value = ''
    catagories.value = ''
    imageFile.value = null
    preview.value = null
}

const delData = async () => {
    await axios.delete('http://localhost:8000/admin', {params: {productID:productID.value}})
    productID.value = ''
}
</script>

<template>
    <div class="flex flex-col gap-4 mx-auto container mt-10">

        <div>
            name <input v-model="name" type="text" class="border">
        </div>

        <div>
            about <input v-model="about" type="text" class="border">
        </div>

        <div>
            price <input v-model="price" type="text" class="border">
        </div>

        <div>
            reviewScore <input v-model="reviewScore" type="text" class="border">
        </div>

        <div>
            catagories <input v-model="catagories" type="text" class="border">
        </div>

        <input type="file" ref="fileInput" accept="image/png, image/jpeg" @change="onFileChange" hidden />

        <button class="btn my-10" @click="triggerUpload">
            Upload Image
        </button>

        <img v-if="preview" :src="preview" class="w-40" />
        
        <button class="btn " @click="postData()">Post</button>

        <div><input v-model="productID" type="text" class="border"></input></div>
        <button class="btn " @click="delData()">Delete</button>

    </div>
</template>
