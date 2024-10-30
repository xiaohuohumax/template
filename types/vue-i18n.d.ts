import type { ResourcePath } from '@intlify/core-base'

declare module 'vue-i18n' {

  export interface I18nLocaleMessage {
    meta: {
      lang: string
      description: string
    }
  }

  export type I18nKeys = ResourcePath<I18nLocaleMessage>

  export interface DefineLocaleMessage extends I18nLocaleMessage { }
}
