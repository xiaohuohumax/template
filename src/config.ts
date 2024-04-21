import { workspace, ConfigurationChangeEvent } from 'vscode';
import * as constants from './constants';

export interface IConfig { }

/**
 * 用户配置信息
 */
export class Config {

  public static Key = constants.CONFIG_KEY;

  public static get get(): IConfig {
    return workspace.getConfiguration().get<IConfig>(
      Config.Key,
      {}
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static watch(key: keyof IConfig, listener: (e: ConfigurationChangeEvent) => any) {
    return workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration(`${Config.Key}.${key}`)) {
        listener(event);
      }
    });
  }
}