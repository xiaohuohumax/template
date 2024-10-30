<script setup lang='ts'>
import { RouteName } from '@/router/routes'
</script>

<template>
  <div class="sticky top-0 z-50 py-2 bg-white">
    <RouterLink :to="{ name: RouteName.Home }">
      Home
    </RouterLink>
    <RouterLink :to="{ name: RouteName.About }">
      About
    </RouterLink>
  </div>
</template>
