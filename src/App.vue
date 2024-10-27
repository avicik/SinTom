<script setup lang="ts">
import { provide, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainToolbar from './components/MainToolbar.vue'

const route = useRoute()
const router = useRouter()
const currentPage = ref('home')
const isRouteReady = ref(false)

provide('currentPage', currentPage)

onMounted(() => {
  if (route.name === null) {
    router.push({ name: 'home' })
  } else {
    currentPage.value = String(route.name)
  }

  router.afterEach((to) => {
    currentPage.value = String(to.name)
    isRouteReady.value = true
    const bgColor = to.name === 'smile' ? 'blue' : (String(to.name) || 'home')
    document.body.className = ''
    document.body.classList.add(`bg--${bgColor}`)
  })
})
</script>

<template>
  <div id="app">
    <router-view v-if="isRouteReady"></router-view>
    <MainToolbar />
  </div>
</template>

<style>
html {
  box-sizing: border-box;
  font-size: 62.5%;
}

*, *:before, *:after {
  box-sizing: inherit;
}

html, body {
  width: 100%;
  height: 100%;
}

body {
  font-size: 1.6rem;
  background: #E6F4FD;
  background: linear-gradient(45deg, #ceeafb, #fefeff);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;  /* 添加过渡效果 */
}

body.bg--blue {
  background: linear-gradient(45deg, #d5edff, white);
}

body.bg--home {
  background: linear-gradient(45deg, #fff5d5, white);
}

body.bg--chart {
  background: linear-gradient(45deg, #d5ffd9, white);
}

body.bg--bell {
  background: linear-gradient(45deg, #ffd5d5, white);
}

body.bg--search {
  background: linear-gradient(45deg, #f5d5ff, white);
}

body.bg--yellow {
  background: linear-gradient(45deg, #ffeeb3, #fff9e6);
}

body.bg--green {
  background: linear-gradient(45deg, #b3ffc3, #e6ffeb);
}

body.bg--purple {
  background: linear-gradient(45deg, #e546ff, #f5d3ff);
}

#app {
  min-height: 100vh;
  padding-bottom: 100px; /* 为底部工具栏留出空间 */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

body {
  margin: 0;
  padding: 0;
}
</style>
