import * as inquirer from 'inquirer';
import { COMMAND } from '../types';

export const askCommand = async (): Promise<COMMAND> => {
  const res = await inquirer.prompt([
    {
      name: 'command',
      type: 'list',
      message: 'What can i do for you, druzhok?',
      choices: [
        { name: 'Initialize new project', value: COMMAND.GENERATE_PROJECT },
        { name: 'Who am i?', value: COMMAND.WHOAMI },
      ],
    },
  ]);

  return res.command as COMMAND;
};
