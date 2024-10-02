/**
 * 消息命令
 */
type MessageCommand = 'showMessage'

/**
 * 消息接口
 */
interface Message<T = any> {
  command: MessageCommand
  data: T
}

/**
 * 显示消息
 */
type ShowMessageMessage = Message<{
  type: 'info' | 'error' | 'warning'
  message: string
}>

/**
 * 消息监听器
 */
interface MessageListener<T = any> {
  (e: Message<T>): any
}
