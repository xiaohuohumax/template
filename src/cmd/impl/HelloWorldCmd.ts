import { window } from 'vscode';
import ICmd from '../iCmd';
import HelloPanel from '#/src/panels/HelloPanel';
import log from '#/src/log';

export class HelloWorldCmd extends ICmd {

  /**
   * 显示消息
   * @param data 消息数据
   */
  async showMessage(data: ShowMessageMessage['data']) {
    switch (data.type) {
      case 'info':
        window.showInformationMessage(data.message);
        break;
      case 'warning':
        window.showWarningMessage(data.message);
        break;
      case 'error':
        window.showErrorMessage(data.message);
        break;
    }
  }

  init(): void {
    // webview 消息监听
    HelloPanel.addWebviewMessageListener(async (message) => {
      log.debug('receive message', message.command, message.data);
      this[message.command] && await this[message.command](message.data);
    });
  }

  async run(..._args: unknown[]) {
    // 显示 webview
    HelloPanel.render(this.context.extensionUri);
  }

  async deactivate() {
    HelloPanel.dispose();
  }
}