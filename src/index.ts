/* eslint-disable no-console */
import * as log from 'loglevel';
import { generateProject } from './commands/generate-project/generate-project';
import { askProjectTemplate } from './commands/generate-project/ui';
import { whoami } from './commands/whoami';
import { COMMAND } from './types';
import { printMonkey } from './ui/print-monkey';
import { askCommand } from './ui/ui';

export const runUi = async () => {
  log.setLevel('debug');

  printMonkey();
  const command = await askCommand();

  if (command === COMMAND.WHOAMI) {
    await whoami();
  } else if (command === COMMAND.GENERATE_PROJECT) {
    const args = await askProjectTemplate();
    generateProject(args);
  }
};

export * from './commands/generate-project/generate-project';
export * from './commands/whoami';
export * from './types';
