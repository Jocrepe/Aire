<script setup>
import { ref,onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const activeMenu = ref('')

onMounted(() => {
  activeMenu.value = route.name
})

const SidebarMenus = [
  {
    name: '- Women\'s Fashion',
    routeName: 'women-fashion'
  },
  {
    name: '- Men\'s Fashion',
    routeName: 'men-fashion'
  },
  {
    name: '- Kid\'s Fashion',
    routeName: 'kid-fashion'
  },
  {
    name: '- Cat Products',
    routeName: 'cat'
  }
]


watch(
  () => route.name,
  (newName) => {
    activeMenu.value = newName;
  }
)
</script>

<template>
  <div class="mx-5 pt-5 border-r-1 border-gray-300 w-70 h-vh">
    <ul class="menu rounded-box w-full text-xl">
      <li class="menu-titles mb-5 text-gray-700">Catagories</li>
      <li v-for="menu in SidebarMenus">
        <RouterLink  :to="{ name: menu.routeName }" :class="menu.routeName === activeMenu ? 'font-bold my-4 text-black' : 'my-2 text-gray-500'">{{ menu.name }}</RouterLink>
      </li>

    </ul>
  </div>
</template>
