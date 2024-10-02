import type { ExtensionContext } from 'vscode'
import cmds from '@/cmd'
import log from '@/log'

export async function activate(context: ExtensionContext) {
  log.debug('activate')
  cmds.forEach(c => c.activate(context))
}

export function deactivate() {
  log.debug('deactivate')
  cmds.forEach(c => c.deactivate())
}
