import * as core from '@actions/core';

/**
 * Main function
 */
async function main(): Promise<void> {
  const message = core.getInput('message');
  console.log(`Get input message: ${message}`);
  core.setOutput('result', new Date().toISOString());
}

main().catch(core.setFailed);