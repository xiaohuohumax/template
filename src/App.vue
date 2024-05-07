<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  const load = document.querySelector('.load');
  if (!load) {
    return;
  }
  load.classList.add('load-ok');
  setTimeout(() => load.remove(), 2200);
});
</script>