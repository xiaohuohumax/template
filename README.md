# vscode extension template

这是一个 vscode 插件模板，包含了 git commit 规范检查、changeset 版本管理、github actions 自动发布等功能。

## 🚀 使用

```bash
# 安装依赖
npm run install:all

# 打包
npm run build

# 构建 vscode 插件
npm run vsce-package
```

## 📦 包含功能

- git commit 规范检查
- changeset 版本管理
- github actions 自动发布
- vite 开发环境
- env 环境变量
- l10n
- webview panel

## ♻️ 提交流程

1. 编写代码
2. [可选] 修改版本号 `npm run changeset`
3. 拉取最新代码 `git pull`
4. 本地提交 `npm run commit`
5. 推送代码到远程仓库

## ⚡ 注意

#### 🤖 github actions 自动发包

1. 将项目根目录下的 `_github` 改为 `.github`
2. 修改仓库权限，允许 actions 运行
3. 发布vscode扩展需要在仓库下创建 `VSCE_PAT` 的 vscode publish token

#### ⏫ changesets 版本管理

1. 修改 `.changeset/config.json` 的 `repo`(仓库地址) 和 `baseBranch`(分支名) 字段

## 📝 更新日志

[CHANGELOG.md](CHANGELOG.md)