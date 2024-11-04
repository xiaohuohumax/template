interface ImportMetaEnv {
  /**
   * 日志等级
   *
   * @default 'Info'
   */
  readonly VITE_LOG_LEVEL?: keyof typeof import('vscode').LogLevel
  /**
   * 日志打印格式
   *
   * @default ':time: :level: :caller: :message:'
   */
  readonly VITE_LOG_FORMAT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
