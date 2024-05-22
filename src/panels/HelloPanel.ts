import { l10n } from 'vscode';
import { Panel } from './Panel';

const webviewBuildPath = ['webview', 'hello', 'build'];
const webviewId = 'showHelloPanel';
const webviewTitle = l10n.t('hello');

export default new Panel(webviewId, webviewTitle, webviewBuildPath);