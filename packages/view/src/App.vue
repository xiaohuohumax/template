<script setup lang='ts'>
import { computed } from 'vue'
import { useClock, useConfig } from './use'
import { l10n, vscode } from './util'

const config = useConfig()
const clock = useClock()

const clockSize = computed(() => `${config.value.size}em`)

function handleClick() {
  vscode.sendMessage({
    command: 'ShowMessage',
    type: 'info',
    message: l10n.t('Now time is {0}', clock.value),
  })
}
</script>

<template>
  <div class="cursor-pointer hover:text-blue-500" :style="{ fontSize: clockSize }" @click="handleClick">
    {{ clock }}
  </div>
</template>
