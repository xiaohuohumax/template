import type * as context from 'context'
import { onUnmounted, ref } from 'vue'
import * as vscode from '../util/vscode'

export function useConfig() {
  const config = ref<context.Config>(window._config)

  const listener: vscode.MessageListener = {
    command: 'UpdateConfig',
    onMessage(msg) {
      config.value = msg.config
    },
  }

  vscode.addMessageListener(listener)
  onUnmounted(() => vscode.removeMessageListener(listener))

  return config
}
