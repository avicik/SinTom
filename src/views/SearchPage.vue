<script setup lang="ts">
import { inject, onMounted, Ref } from 'vue'
import SearchBar from '@/components/SearchBar.vue'

const currentPage = inject('currentPage') as Ref<string>

onMounted(() => {
  currentPage.value = 'search'
})
</script>

<template>
  <div class="page-content">
    <SearchBar />
  </div>
</template>

<style scoped>
.page-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw; /* 确保页面内容占满整个视口宽度 */
}
</style>
