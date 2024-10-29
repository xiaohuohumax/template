import type { ConfigManager } from './config'
import type { Logger } from './logger'
import * as vscode from 'vscode'
import { ID } from './constant'
import { Disposable } from './util'
import { View } from './view'

export class CommandsManager extends Disposable {
  private readonly context: vscode.ExtensionContext
  private readonly logger: Logger
  private readonly configManager: ConfigManager

  constructor(context: vscode.ExtensionContext, configManager: ConfigManager, logger: Logger) {
    super()
    this.context = context
    this.configManager = configManager
    this.logger = logger

    this.logger.info('CommandsManager initialized')
    this.logger.info(`Config: ${JSON.stringify(this.configManager.config)}`)

    this.registerCommand(`${ID}.view`, arg => this.view(arg))
  }

  private registerCommand(command: string, callback: (...args: any[]) => any) {
    this.registerDisposables(
      vscode.commands.registerCommand(command, (...args: any[]) => {
        this.logger.info(`Command Invoked: ${command}`)
        callback(...args)
      }),
    )
  }

  private view(_arg: any) {
    View.createOrShow(this.context.extensionUri, this.configManager, this.logger)
  }
}
