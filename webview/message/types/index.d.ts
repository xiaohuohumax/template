/**
 * 消息命令
 */
export type MessageCommand = 'showMessage'

/**
 * 消息接口
 */
export interface Message<T = any> {
  command: MessageCommand
  data: T
}

/**
 * 显示消息
 */
export type ShowMessageMessage = Message<{
  type: 'info' | 'error' | 'warning'
  message: string
}>

/**
 * 消息监听器
 */
export interface MessageListener<T = any> {
  (e: Message<T>): any
}
