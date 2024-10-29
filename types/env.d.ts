interface ImportMetaEnv {
  readonly VITE_LOG_LEVEL: keyof typeof import('vscode').LogLevel
  readonly VITE_LOG_FORMAT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
