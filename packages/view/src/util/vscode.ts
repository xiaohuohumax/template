import type * as context from 'context'
import type { WebviewApi } from 'vscode-webview'

const VSCODE_API: WebviewApi<unknown> | undefined
  = typeof acquireVsCodeApi === 'function'
    ? acquireVsCodeApi()
    : undefined

export function sendMessage(msg: context.RequestMessage) {
  VSCODE_API?.postMessage(msg)
}

export interface MessageListener extends context.BaseMessage {
  readonly command: context.ResponseMessage['command']
  onMessage: (msg: context.ResponseMessage) => void
}

const messageListeners: MessageListener[] = []

export function addMessageListener(listener: MessageListener) {
  messageListeners.push(listener)
}

window.addEventListener('message', (event) => {
  const msg = event.data as context.ResponseMessage
  messageListeners.forEach((listener) => {
    if (listener.command === msg.command) {
      listener.onMessage(msg)
    }
  })
})

export function removeMessageListener(listener: MessageListener) {
  const index = messageListeners.indexOf(listener)
  if (index >= 0) {
    messageListeners.splice(index, 1)
  }
}
