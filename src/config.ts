import type { Config } from 'context'
import * as vscode from 'vscode'
import { ID } from './constant'
import { Disposable } from './util'

export class ConfigManager extends Disposable {
  private static DEFAULT_CONFIG: Config = {
    size: 9,
  }

  get config(): Config {
    return vscode.workspace.getConfiguration().get<Config>(ID, ConfigManager.DEFAULT_CONFIG)
  }

  public onDidChangeConfiguration(...args: Parameters<vscode.Event<vscode.ConfigurationChangeEvent>>) {
    this.registerDisposables(
      vscode.workspace.onDidChangeConfiguration(...args),
    )
  }
}
