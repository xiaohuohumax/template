<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="defineStore.add">count is {{ defineStore.count }}</button>
    <button class="ml-2" type="button" @click="test">axios</button>
    <p class="mt-6">
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<script setup lang="ts">
import { useDefineStore } from '@/store/defineStore';
import { test } from '@/api/defineApi';

defineProps<{ msg: string }>();

const defineStore = useDefineStore();
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
