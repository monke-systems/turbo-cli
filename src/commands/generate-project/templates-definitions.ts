import type { TemplateDefinition } from "./types";
import { CommonDir, CommonFile, Template } from "./types";

export const getNpmPackageDefinition = (args: {
  projectName: string;
  withTests: boolean;
  repositoryUrl?: string;
}): TemplateDefinition => {
  return {
    type: Template.NpmPackage,
    commonDirs: [...(args.withTests ? [CommonDir.Tests] : [])],
    commonFiles: [
      { type: CommonFile.EditorConfig },
      { type: CommonFile.PrettierRc },
      { type: CommonFile.GitIgnore },
      {
        type: CommonFile.EslintRc,
        values: {
          withTests: args.withTests,
        },
      },
      {
        type: CommonFile.PackageJson,
        values: {
          packageName: args.projectName,
          main: "lib/index.js",
          types: "lib/index.d.ts",
          repoUrl: args.repositoryUrl,
          isPackage: true,
          withTests: args.withTests,
        },
      },
      {
        type: CommonFile.Readme,
        values: {
          projectName: args.projectName,
          isNpmPackage: true,
        },
      },
      {
        type: CommonFile.TsConfig,
        values: {
          isPackage: true,
          withTests: args.withTests,
        },
      },
      { type: CommonFile.TsConfigBuild },
    ],
  };
};

export const getGenericTsDefinition = (args: {
  projectName: string;
  repositoryUrl: string;
  withTests: boolean;
}): TemplateDefinition => {
  return {
    type: Template.GenericTs,
    commonDirs: [...(args.withTests ? [CommonDir.Tests] : [])],
    commonFiles: [
      { type: CommonFile.EditorConfig },
      { type: CommonFile.GitIgnore },
      { type: CommonFile.PrettierRc },
      {
        type: CommonFile.EslintRc,
        values: {
          withTests: args.withTests,
        },
      },
      {
        type: CommonFile.PackageJson,
        values: {
          packageName: args.projectName,
          main: "dist/index.js",
          types: "dist/index.d.ts",
          repoUrl: args.repositoryUrl,
          isPackage: false,
          withTests: args.withTests,
        },
      },
      {
        type: CommonFile.Readme,
        values: {
          projectName: args.projectName,
          isNpmPackage: false,
        },
      },
      {
        type: CommonFile.TsConfig,
        values: {
          isPackage: false,
          withTests: args.withTests,
        },
      },
      { type: CommonFile.TsConfigBuild },
    ],
  };
};

export const getNestJsDefinition = (args: {
  projectName: string;
  repositoryUrl: string;
}): TemplateDefinition => {
  return {
    type: Template.NestJs,
    commonDirs: [],
    commonFiles: [
      { type: CommonFile.EditorConfig },
      { type: CommonFile.GitIgnore },
      { type: CommonFile.PrettierRc },
      {
        type: CommonFile.EslintRc,
        values: {
          withTests: true,
          isNestProject: true,
        },
      },
      {
        type: CommonFile.PackageJson,
        values: {
          packageName: args.projectName,
          main: "dist/src/main.js",
          repoUrl: args.repositoryUrl,
          isPackage: false,
          withTests: true,
          isNestProject: true,
          includeDotenv: true,
        },
      },
      {
        type: CommonFile.Readme,
        values: {
          projectName: args.projectName,
          configReferenceLink: true,
        },
      },
      {
        type: CommonFile.TsConfig,
        values: {
          isPackage: false,
          isNestProject: true,
        },
      },
      {
        type: CommonFile.TsConfigBuild,
        values: {
          isNestProject: true,
        },
      },
    ],
  };
};
