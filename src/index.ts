import * as core from '@actions/core'
import * as github from '@actions/github'

async function main(): Promise<void> {
  // 普通输入
  const message = core.getInput('message')
  core.info(`message: ${message}`)

  // 仓库信息
  const { owner, repo } = github.context.repo
  core.info(`owner: ${owner}, repo: ${repo}`)

  // 访问 GitHub API
  // const token = core.getInput('token');
  // const octokit = github.getOctokit(token);
  // core.info(`token: ${token}, octokit: ${octokit}`);

  // 输出
  core.setOutput('result', new Date().toISOString())
}

main().catch(core.setFailed)
