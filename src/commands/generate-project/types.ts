import type { CommonFileValues } from './common-files-values';

export enum TEMPLATE {
  NPM_PACKAGE = 'npm-package',
  GENERIC_TS = 'generic-ts',
}

export type GenerateProjectArgs = {
  template: TEMPLATE;
  targetDir: string;
  projectName: string;
  repositoryUrl: string;
  withTests: boolean;
  initGitRepo: boolean;
};

export enum TEMPLATE_ROOT {
  COMMON_FILE = 'common-files',
  COMMON_DIR = 'common-dirs',
  TEMPLATE = '',
}

export enum COMMON_FILE {
  EDITOR_CONIFG = '.editorconfig',
  ESLINT_RC = '.eslintrc.yml',
  GIT_IGNORE = '.gitignore',
  NPM_RC = '.npmrc',
  PRETTIER_RC = '.prettierrc.yml',
  PACKAGE_JSON = 'package.json',
  README = 'README.md',
  TS_CONFIG_BUILD = 'tsconfig.build.json',
  TS_CONFIG = 'tsconfig.json',
}

export enum COMMON_DIR {
  HUSKY = '.husky',
  TESTS = 'tests',
}

export type CommonFileDefinition = {
  type: COMMON_FILE;
  values?: CommonFileValues;
};

export type TemplateDefinition = {
  type: TEMPLATE;
  commonFiles: CommonFileDefinition[];
  commonDirs: COMMON_DIR[];
};
