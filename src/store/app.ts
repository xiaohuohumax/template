import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const useAppStore = defineStore('app', () => {
  const count = ref(0)

  function increment() {
    count.value++
  }

  const doubleCount = computed(() => count.value * 2)

  return {
    count,
    doubleCount,
    increment,
  }
})

export default useAppStore
