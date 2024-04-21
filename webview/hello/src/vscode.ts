import type { WebviewApi } from 'vscode-webview';

export interface CommandMessageListener {
  command: MessageCommand;
  callback: (message: Message) => void;
}

const _messageListeners: CommandMessageListener[] = [];

window.addEventListener('message', (event) => {
  const message = event.data as Message;
  _messageListeners.forEach((listener) => {
    if (listener.command === message.command) {
      listener.callback(message);
    }
  });
});

const _vsCodeApi: WebviewApi<unknown> | undefined =
  typeof acquireVsCodeApi === 'function'
    ? acquireVsCodeApi()
    : undefined;

/**
 * 发送消息
 * @param message 消息
 */
function postMessage(message: Message) {
  _vsCodeApi?.postMessage(message);
}

/**
 * 添加消息监听器
 * @param listener 消息监听器
 */
function addEventListener(listener: CommandMessageListener) {
  _messageListeners.push(listener);
}

/**
 * 删除消息监听器
 * @param listener 消息监听器
 */
function removeEventListener(listener: CommandMessageListener) {
  const index = _messageListeners.indexOf(listener);
  if (index >= 0) {
    _messageListeners.splice(index, 1);
  }
}

/**
 * 显示消息
 * @param data 消息
 */
function showMessage(data: ShowMessageMessage['data']) {
  postMessage({
    command: 'showMessage',
    data
  });
}

export default {
  addEventListener,
  removeEventListener,
  showMessage
};
