import * as fs from 'fs';
import * as path from 'path';
import * as inquirer from 'inquirer';
import { TEMPLATE, GENERATE_PROJECT_ARGS } from './types';

export const askProjectTemplate = async (): Promise<GENERATE_PROJECT_ARGS> => {
  const results = await inquirer.prompt([
    {
      name: 'template',
      type: 'list',
      message: 'Nice. Сhoose, buddy',
      choices: [
        { name: 'npm package with typescript', value: TEMPLATE.NPM_PACKAGE },
      ],
    },
    {
      name: 'targetDir',
      type: 'input',
      message: 'Which folder will you choose?\n',
      default: path.resolve(),
      filter: (value: string) => {
        return path.resolve(value);
      },
      validate: (value: string) => {
        try {
          const res = fs.readdirSync(path.resolve(value));
          if (res.length > 0) {
            throw new Error('Directory is not empty! It\'s unsafe to create project here');
          }
          return true;
        } catch (e) {
          if (e.code === 'ENOENT') {
            return true;
          }
          throw new Error(e);
        }
      },
    },
    {
      name: 'projectName',
      type: 'input',
      message: 'Project name?',
      validate: (val: string) => val.length > 0,
    },
    {
      name: 'repositoryUrl',
      type: 'input',
      message: 'Repository url. You can leave it empty, bro',
    },
    {
      name: 'features',
      type: 'checkbox',
      message: 'Select features',
      choices: [
        { name: 'e2e and unit test with jest', value: 'tests', checked: true },
        { name: 'init git repository', value: 'initGit', checked: true },
      ],
    },
  ]);

  const { confirm } = await inquirer.prompt([
    {
      name: 'confirm',
      type: 'confirm',
      message: `What we got to do \n${JSON.stringify(results, null, 2)}\n Confirm?`,
    },
  ]);

  if (confirm === false) {
    process.exit(0);
  }

  const { template, targetDir, projectName, features, repositoryUrl } = results;

  return {
    template,
    targetDir,
    projectName,
    repositoryUrl,
    withTests: features.includes('tests'),
    initGitRepo: features.includes('initGit'),
  };
};
