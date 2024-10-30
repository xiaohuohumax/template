<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const htmlClassList = document.documentElement.classList
  htmlClassList.add('load-ok')
  setTimeout(() => htmlClassList.remove('loading'), 1500)
})
</script>

<template>
  <RouterView />
</template>
