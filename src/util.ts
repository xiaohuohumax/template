import type * as vscode from 'vscode'

export class Disposable implements vscode.Disposable {
  private disposables: vscode.Disposable[] = []
  private disposed: boolean = false

  public dispose() {
    this.disposed = true
    this.disposables.forEach((disposable) => {
      try {
        disposable.dispose()
      }
      // eslint-disable-next-line unused-imports/no-unused-vars
      catch (_) { }
    })
    this.disposables = []
  }

  protected registerDisposables(...disposable: vscode.Disposable[]) {
    this.disposables.push(...disposable)
  }

  protected isDisposed() {
    return this.disposed
  }
}

export function toDisposable(fn: () => void): vscode.Disposable {
  return {
    dispose: fn,
  }
}

export function getNonce(): string {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
