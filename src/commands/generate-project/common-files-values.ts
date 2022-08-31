export type PackageJsonValues = {
  packageName: string;
  main: string;
  types?: string;
  repoUrl?: string;
  isPackage?: boolean;
  withTests?: boolean;
  isNestProject?: boolean;
  includeDotenv?: boolean;
};

export type ReadmeValues = {
  projectName?: string;
  isNpmPackage?: boolean;
  configReferenceLink?: boolean;
};

export type EslintRcValues = {
  withTests?: boolean;
  isNestProject?: boolean;
};

export type TsConfigValues = {
  isPackage?: boolean;
  withTests?: boolean;
  isNestProject?: boolean;
};

export type CommonFileValues =
  | PackageJsonValues
  | ReadmeValues
  | TsConfigValues
  | EslintRcValues;
