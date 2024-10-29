import type { RequestMessage, ResponseMessage } from 'context'
import type { ConfigManager } from './config'
import type { Logger } from './logger'
import * as vscode from 'vscode'
import { ID, NAME } from './constant'
import { Disposable, getNonce, toDisposable } from './util'

export class View extends Disposable {
  public static currentPanel: View | undefined

  private readonly extensionPath: vscode.Uri
  private configManager: ConfigManager
  private logger: Logger
  private isPanelVisible: boolean = true
  private readonly panel: vscode.WebviewPanel
  private readonly viewDistPath = ['packages', 'view', 'dist']

  constructor(extensionPath: vscode.Uri, configManager: ConfigManager, logger: Logger, column: vscode.ViewColumn | undefined) {
    super()

    this.extensionPath = extensionPath
    this.configManager = configManager
    this.logger = logger

    this.panel = vscode.window.createWebviewPanel(ID, NAME, column || vscode.ViewColumn.One, {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this.extensionPath, ...this.viewDistPath),
      ],
    })

    this.configManager.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration(ID)) {
        this.logger.info('ClockView config changed', this.configManager.config)
        this.sendMessage({
          command: 'UpdateConfig',
          config: this.configManager.config,
        })
      }
    })

    this.registerDisposables(
      toDisposable(() => {
        View.currentPanel = undefined
      }),
      this.panel.onDidChangeViewState(() => {
        if (this.panel.visible !== this.isPanelVisible) {
          if (this.panel.visible) {
            this.update()
          }
          this.isPanelVisible = this.panel.visible
        }
      }),
      this.panel.onDidDispose(() => this.dispose()),
      this.panel.webview.onDidReceiveMessage(msg => this.respondToMessage(msg)),
      this.panel,
    )

    this.update()

    this.logger.info('ClockView created')
  }

  private respondToMessage(message: RequestMessage) {
    switch (message.command) {
      case 'ShowMessage': {
        const messageFunc: { [key in RequestMessage['type']]: (message: string) => Thenable<void> } = {
          info: vscode.window.showInformationMessage,
          warning: vscode.window.showWarningMessage,
          error: vscode.window.showErrorMessage,
        }
        messageFunc[message.type](message.message)
      }
    }
    this.logger.info('ClockView received message', message)
  }

  private sendMessage(message: ResponseMessage) {
    if (this.isDisposed()) {
      this.logger.warn('ClockView is disposed, cannot send message')
      return
    }
    this.panel.webview.postMessage(message)
      .then(
        () => { },
        () => {
          if (this.isDisposed()) {
            this.logger.warn(`The View was disposed while sending "${message.command}" message`)
          }
          else {
            this.logger.error(`Unable to send "${message.command}" message to the View`)
          }
        },
      )
  }

  private getUri(...pathList: string[]) {
    return this.panel.webview.asWebviewUri(vscode.Uri.joinPath(this.extensionPath, ...pathList))
  }

  private getHtml() {
    const stylesUri = this.getUri(...this.viewDistPath, 'assets', 'index.css')
    const scriptUri = this.getUri(...this.viewDistPath, 'assets', 'index.js')
    const nonce = getNonce()

    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${this.panel.webview.cspSource}; script-src 'nonce-${nonce}'; img-src data:;">
        <link rel="stylesheet" type="text/css" href="${stylesUri}">
        <title>${NAME}</title>
      </head>
      <body>
        <div id="app"></div>
        <script nonce="${nonce}"> window._config = ${JSON.stringify(this.configManager.config)}; </script>
        <script nonce="${nonce}"> window._l10nContents = ${JSON.stringify(vscode.l10n.bundle)}; </script>
        <script nonce="${nonce}" type="module" src="${scriptUri}"></script>
      </body>
    </html>`
  }

  private update() {
    this.panel.webview.html = this.getHtml()
    this.logger.info('ClockView updated')
  }

  public static createOrShow(extensionPath: vscode.Uri, configManager: ConfigManager, logger: Logger) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined

    if (View.currentPanel) {
      if (import.meta.env.MODE !== 'development') {
        View.currentPanel.panel.reveal(column)
        return
      }
      else {
        View.currentPanel.dispose()
      }
    }
    View.currentPanel = new View(extensionPath, configManager, logger, column)
  }
}
