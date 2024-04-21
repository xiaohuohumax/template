import { defineStore } from 'pinia';
import { toRef } from 'vue';

export const useDefineStore = defineStore('define', {
  state: () => ({
    count: 0
  }),
  actions: {
    add() {
      this.count++;
    }
  }
});

export function useDefineStoreRef() {
  return toRef(useDefineStore());
}