import { Disposable, Uri, ViewColumn, Webview, WebviewPanel, l10n, window } from 'vscode';

/**
 * 获取webview相对路径
 * @param webview webview
 * @param extensionUri 扩展Uri
 * @param pathList 路径列表
 * @returns 
 */
function _getUri(webview: Webview, extensionUri: Uri, ...pathList: string[]) {
  return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
}

export class Panel {

  private panel: WebviewPanel | undefined;
  private disposables: Disposable[] = [];
  private listeners: MessageListener[] = [];

  constructor(public webviewId: string, public webviewTitle: string, public webviewBuildPath: string[]) { }

  /**
   * 生成html内容
   * @param webview webview
   * @param extensionUri 扩展Uri
   * @returns 
   */
  private getWebviewContent(webview: Webview, extensionUri: Uri) {
    const stylesUri = _getUri(webview, extensionUri, ...this.webviewBuildPath, 'assets', 'index.css');
    const scriptUri = _getUri(webview, extensionUri, ...this.webviewBuildPath, 'assets', 'index.js');

    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" type="text/css" href="${stylesUri}">
        <title>Export Profiles</title>
      </head>
      <body>
        <div id="app"></div>
        <script> window._l10nContents = ${JSON.stringify(l10n.bundle)}; </script>
        <script type="module" src="${scriptUri}"></script>
      </body>
    </html>
  `;
  }

  /**
   * 发送消息
   * @param message 消息
   */
  postMessage(message: Message) {
    this.panel?.webview.postMessage(message);
  }


  /**
   * 监听消息
   * @param listener 监听器
   */
  addWebviewMessageListener(listener: MessageListener) {
    this.listeners.push(listener);
  }

  /**
   * 渲染面板
   * @param extensionUri 插件Uri
   * @returns 
   */
  render(extensionUri: Uri) {
    if (this.panel) {
      if (import.meta.env.PROD) {
        // 如果面板已经存在，则直接显示
        this.panel.reveal(ViewColumn.One);
        return;
      } else {
        // 开发环境，如果面板已经存在，则销毁，方便调试界面
        this.dispose();
      }
    }
    const panel = window.createWebviewPanel(
      this.webviewId,
      this.webviewTitle,
      ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          Uri.joinPath(extensionUri, 'out'),
          Uri.joinPath(extensionUri, ...this.webviewBuildPath)
        ],
      }
    );
    // 监听面板关闭
    panel.onDidDispose(() => this.dispose(), null, this.disposables);
    // 加载html内容
    panel.webview.html = this.getWebviewContent(panel.webview, extensionUri);
    // 添加监听器
    this.listeners.forEach(listener => panel.webview.onDidReceiveMessage(
      listener,
      undefined,
      this.disposables
    ));
    this.panel = panel;
  }

  /**
   * 销毁面板
   */
  dispose() {
    this.panel?.dispose();
    this.panel = undefined;

    while (this.disposables.length) {
      const disposable = this.disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  /**
   * 是否已经初始化
   * @returns 
   */
  isInit() {
    return this.panel !== undefined;
  }

}