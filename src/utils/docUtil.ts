import * as vscode from 'vscode'

/**
 * 创建新文档
 * @param content 文档内容
 * @param language 文档语言类型
 * @returns 新文档
 */
export async function createDocument(content: string, language: string = 'plaintext') {
  const doc = await vscode.workspace.openTextDocument({ language, content })
  await vscode.window.showTextDocument(doc)
  return doc
}

/**
 * 更新文档内容
 * @param document 文档
 * @param content 新内容
 */
export async function updateDocument(document: vscode.TextDocument, content: string) {
  const edit = new vscode.WorkspaceEdit()
  edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), content)
  await vscode.workspace.applyEdit(edit)
}

/**
 * 关闭文档
 * @param document 文档
 * @returns 是否关闭成功
 */
export async function closeDocument(document: vscode.TextDocument) {
  try {
    if (document.isClosed) {
      return
    }
    await vscode.window.showTextDocument(document)
    await vscode.commands.executeCommand('workbench.action.closeActiveEditor')
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (_) { }
}

export default {
  createDocument,
  updateDocument,
  closeDocument,
}
