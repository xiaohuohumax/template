import { l10n } from 'vscode'
import { Panel } from './Panel'

const webviewBuildPath = ['webview', 'hello', 'dist']
const webviewId = 'showHelloPanel'
const webviewTitle = l10n.t('hello')

export default new Panel(webviewId, webviewTitle, webviewBuildPath)
