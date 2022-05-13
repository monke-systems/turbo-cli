export type PackageJsonValues = {
  packageName: string;
  main: string;
  types: string;
  repoUrl?: string;
  isPackage: boolean;
  withTests: boolean;
};

export type ReadmeValues = {
  projectName: string;
  isNpmPackage: boolean;
};

export type EslintRcValues = {
  withTests: boolean;
};

export type TsConfigValues = {
  isPackage: boolean;
  withTests: boolean;
};

export type CommonFileValues =
  | PackageJsonValues
  | ReadmeValues
  | TsConfigValues
  | EslintRcValues;
