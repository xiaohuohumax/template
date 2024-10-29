import type { ExtensionContext } from 'vscode'
import { CommandsManager } from './commands'
import { ConfigManager } from './config'
import { Logger } from './logger'

export async function activate(context: ExtensionContext) {
  const configManager = new ConfigManager()
  const logger = new Logger()
  const commandsManager = new CommandsManager(context, configManager, logger)

  context.subscriptions.push(
    configManager,
    commandsManager,
    logger,
  )
}

export function deactivate() { }
