import type { Config } from './config'

export interface BaseMessage {
  readonly command: string
}

export type RequestMessage = RequestShowMessage

export type ResponseMessage = ResponseUpdateConfig

export interface RequestShowMessage extends BaseMessage {
  readonly command: 'ShowMessage'
  readonly type: 'info' | 'warning' | 'error'
  readonly message: string
}

export interface ResponseUpdateConfig extends BaseMessage {
  readonly command: 'UpdateConfig'
  readonly config: Config
}
