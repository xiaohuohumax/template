import { defineStore } from 'pinia'
import { computed, ref, toRef } from 'vue'

export const useDefineStore = defineStore('define', () => {
  // state
  const count = ref(0)
  // actions
  function add() {
    count.value++
  }
  // getters
  const doubleCount = computed(() => count.value * 2)
  return { count, doubleCount, add }
})

export function useDefineStoreRef() {
  return toRef(useDefineStore())
}
