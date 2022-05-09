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
