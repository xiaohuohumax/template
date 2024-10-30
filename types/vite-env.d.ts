interface ImportMetaEnv {
  /**
   * 项目名称
   */
  readonly VITE_APP_NAME: string
  /**
   * 接口地址
   */
  readonly VITE_API_BASE_URL: string
  /**
   * 日志级别
   *
   * 可选值：TRACE, DEBUG, INFO, WARN, ERROR, SILENT
   * @default 'INFO'
   */
  readonly VITE_LOG_LEVEL?: import('loglevel').LogLevelDesc
  /**
   * 是否启用 APP配置 独立打包
   *
   * @default 'true'
   */
  readonly VITE_CONFIG_BUNDLED_SEPARATELY?: string
  /**
   * 路由模式
   *
   * 可选值：Memory, WebHash, Web
   * @default 'Web'
   */
  readonly VITE_ROUTER_HISTORY?: 'Memory' | 'WebHash' | 'Web'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
