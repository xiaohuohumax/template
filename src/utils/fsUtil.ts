import * as vscode from 'vscode';
import * as jsonParser from 'jsonc-parser';

/**
 * 资源是否存在
 * @param uri 资源路径
 * @returns 
 */
export async function isExists(uri: vscode.Uri) {
  try {
    await vscode.workspace.fs.stat(uri);
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * 获取文件夹子文档列表
 * @param uri 文件夹路径
 * @returns 
 */
export async function readDirectory(uri: vscode.Uri) {
  return (await vscode.workspace.fs.readDirectory(uri));
}

/**
 * 读取文档内容
 * @param uri 文档路径
 * @param encoding 编码格式
 * @returns 
 */
export async function readFile(uri: vscode.Uri, encoding?: BufferEncoding) {
  const decoder = new TextDecoder(encoding);
  return decoder.decode(await vscode.workspace.fs.readFile(uri));
}

/**
 * 读取JSON格式文档
 * @param uri 文档路径
 * @param encoding 编码格式
 * @returns 
 */
export async function readJSONFile<T = unknown>(uri: vscode.Uri, encoding?: BufferEncoding) {
  return jsonParser.parse(await readFile(uri, encoding)) as T;
}

/**
 * 写入文档
 * @param uri 文档路径
 * @param data 数据
 * @returns 
 */
export async function writeFile(uri: vscode.Uri, data: string) {
  return vscode.workspace.fs.writeFile(uri, new TextEncoder().encode(data));
}

/**
 * 写入JSON格式文档
 * @param uri 文档路径
 * @param data 数据
 * @param space 缩进空格数
 * @returns 
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function writeJSONFile(uri: vscode.Uri, data: any, space: number | undefined = 2) {
  return writeFile(uri, JSON.stringify(data, null, space));
}

export default {
  isExists,
  readDirectory,
  readFile,
  readJSONFile,
  writeFile,
  writeJSONFile
};