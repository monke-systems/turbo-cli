import { COMMON_DIR, COMMON_FILE, TEMPLATE, TemplateDefinition } from './types';

export const getNpmPackageDefinition = (args: {
  projectName: string;
  withTests: boolean;
  repositoryUrl?: string;
}): TemplateDefinition => {
  return {
    type: TEMPLATE.NPM_PACKAGE,
    commonDirs: [
      COMMON_DIR.HUSKY,
      ...args.withTests ? [COMMON_DIR.TESTS] : [],
    ],
    commonFiles: [
      { type: COMMON_FILE.EDITOR_CONIFG },
      { type: COMMON_FILE.GIT_IGNORE },
      { type: COMMON_FILE.NPM_RC },
      { type: COMMON_FILE.PACKAGE_JSON, values: {
        packageName: args.projectName,
        main: 'lib/index.js',
        types: 'lib/index.d.ts',
        repoUrl: args.repositoryUrl,
        isPackage: true,
        withTests: args.withTests,
      } },
      { type: COMMON_FILE.README, values: {
        projectName: args.projectName,
        isNpmPackage: true,
      } },
      { type: COMMON_FILE.TS_CONFIG },
      { type: COMMON_FILE.TS_CONFIG_BUILD },
    ],
  };
};
