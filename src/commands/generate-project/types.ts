import type { CommonFileValues } from "./common-files-values";

export enum Template {
  NpmPackage = "npm-package",
  GenericTs = "generic-ts",
  NestJs = "nestjs",
}

export type GenerateProjectArgs = {
  template: Template;
  targetDir: string;
  projectName: string;
  repositoryUrl: string;
  withTests: boolean;
  initGitRepo: boolean;
};

export enum TemplateRoot {
  CommonFile = "common-files",
  CommonDir = "common-dirs",
  Template = "",
}

export enum CommonFile {
  EditorConfig = ".editorconfig",
  EslintRc = ".eslintrc.yml",
  GitIgnore = ".gitignore",
  PrettierRc = ".prettierrc.yml",
  PackageJson = "package.json",
  Readme = "README.md",
  TsConfigBuild = "tsconfig.build.json",
  TsConfig = "tsconfig.json",
}

export enum CommonDir {
  Tests = "tests",
}

export type CommonFileDefinition = {
  type: CommonFile;
  values?: CommonFileValues;
};

export type TemplateDefinition = {
  type: Template;
  commonFiles: CommonFileDefinition[];
  commonDirs: CommonDir[];
};
