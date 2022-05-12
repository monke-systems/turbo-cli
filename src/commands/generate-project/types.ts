import type { PackageJsonValues, ReadmeValues } from './common-files-values';

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
  PACKAGE_JSON = 'package.json',
  EDITOR_CONIFG = '.editorconfig',
  GIT_IGNORE = '.gitignore',
  NPM_RC = '.npmrc',
  README = 'README.md',
  TS_CONFIG = 'tsconfig.json',
  TS_CONFIG_BUILD = 'tsconfig.build.json',
}

export enum COMMON_DIR {
  HUSKY = '.husky',
  TESTS = 'tests',
}

export enum TEMPLATE {
  NPM_PACKAGE = 'npm-package',
}

export type CommonFileDefinition = {
  type: COMMON_FILE;
  values?: PackageJsonValues | ReadmeValues;
};

export type TemplateDefinition = {
  type: TEMPLATE;
  commonFiles: CommonFileDefinition[];
  commonDirs: COMMON_DIR[];
};
