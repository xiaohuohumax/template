interface ImportMetaEnv {
  /**
   * 是否提取应用配置(appConfig.ts)到单独文件
   */
  readonly VITE_IS_EXTRACT_APP_CONFIG: boolean
}

interface ImportMeta {
  url: string
  readonly env: ImportMetaEnv
}