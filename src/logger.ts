import util from 'util'
import * as vscode from 'vscode'
import { NAME } from './constant'
import { Disposable } from './util'

export class Logger extends Disposable {
  public static readonly LOG_LEVEL: vscode.LogLevel = vscode.LogLevel[import.meta.env.VITE_LOG_LEVEL]
  private static readonly DEFAULT_FORMAT: string = ':time: :level: :caller: :message:'

  public static inspectMessages(...messages: unknown[]): string {
    return messages.map(message =>
      typeof message === 'string'
        ? message
        : util.inspect(message, false, null, false),
    ).join(' ')
  }

  private readonly channel: vscode.OutputChannel

  constructor() {
    super()
    this.channel = vscode.window.createOutputChannel(NAME)
    this.registerDisposables(this.channel)
  }

  private _base(level: vscode.LogLevel, ...messages: unknown[]) {
    if (level < Logger.LOG_LEVEL || level === vscode.LogLevel.Off) {
      return
    }

    let caller = ''
    const stack = new Error('error').stack
    if (stack) {
      caller = stack.split('\n')[3]?.replace(/\s*at\s*/i, '')
    }

    const formatMap: [string, string][] = [
      [':time:', new Date().toLocaleString()],
      [':level:', vscode.LogLevel[level].padStart(7, ' ')],
      [':caller:', caller],
      [':message:', Logger.inspectMessages(...messages)],
    ]

    const message = formatMap.reduce(
      (f, [key, value]) => f.replaceAll(key, () => value),
      import.meta.env.VITE_LOG_FORMAT || Logger.DEFAULT_FORMAT,
    )

    this.channel.appendLine(message)
  }

  public log(level: vscode.LogLevel, ...messages: unknown[]) {
    this._base(level, ...messages)
  }

  public info(...messages: unknown[]) {
    this._base(vscode.LogLevel.Info, ...messages)
  }

  public warn(...messages: unknown[]) {
    this._base(vscode.LogLevel.Warning, ...messages)
  }

  public error(...messages: unknown[]) {
    this._base(vscode.LogLevel.Error, ...messages)
  }

  public debug(...messages: unknown[]) {
    this._base(vscode.LogLevel.Debug, ...messages)
  }
}
