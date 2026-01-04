<script setup>
import { ref } from 'vue';

import { useAdminProductStore } from '@/stores/admin/adminProduct';

import adminSidebarLayout from '@/components/admin/adminSidebarLayout.vue';

const adminProductStore = useAdminProductStore()


const name = ref('')
const about = ref('')
const price = ref('')
const reviewScore = ref('')
const category = ref('')

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

const AddData = async () => {
  if (!imageFile.value) {
    alert('Please upload product image')
    return
  }

  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('about', about.value)
  formData.append('price', price.value)
  formData.append('reviewScore', reviewScore.value)
  formData.append('catagories', category.value)
  formData.append('image', imageFile.value)

  await adminProductStore.AddNewProduct(formData)

  name.value = ''
  about.value = ''
  price.value = ''
  reviewScore.value = ''
  category.value = ''
  imageFile.value = null
  preview.value = null
  
  isAlert.value = true
  setTimeout(() => {
    isAlert.value = false
  }, 1000)
}

</script>

<template>
    <adminSidebarLayout>
        <div v-if="isAlert" class="inset-0 fixed bg-black/85 flex items-center justify-center z-100">
            <div class="p-10 bg-white rounded-xl text-xl ">Product Added!</div>
        </div>

        <div>
            <a href="" class="text-2xl font-bold">Add New Product</a>
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

        <div class="flex flex-col mt-5">
            <a href="" class="text-xl font-light">Product Image</a>

            <input type="file" ref="fileInput" name="image" accept="image/png, image/jpeg" @change="onFileChange" hidden />

            <img v-if="preview" :src="preview" class="w-100 border my-10" />

            <button class="btn btn-soft my-5 w-30" @click="triggerUpload">
                Upload file
            </button>
        </div>

        <div class="divider"></div>
        <div class="w-full flex justify-center"><button class="btn btn-info w-40" @click="AddData()">Add Product</button></div>
    </adminSidebarLayout>
</template>