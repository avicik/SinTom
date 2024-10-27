<template>
  <div class="page-content">
    <h1>欢迎来到主页</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage'
})
</script>

<style scoped>
.page-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
