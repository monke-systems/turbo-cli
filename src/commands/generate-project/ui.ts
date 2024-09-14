import * as fs from "fs";
import * as path from "path";
import * as inquirer from "inquirer";
import { isNodeError } from "../../utils/utils";
import type { GenerateProjectArgs } from "./types";
import { Template } from "./types";

export const askProjectTemplate = async (): Promise<GenerateProjectArgs> => {
  const results = await inquirer.prompt([
    {
      name: "template",
      type: "list",
      message: "Nice. Сhoose, buddy",
      choices: [
        { name: "generic project with typescript", value: Template.GenericTs },
        { name: "npm package with typescript", value: Template.NpmPackage },
        { name: "nestjs project", value: Template.NestJs },
      ],
    },
    {
      name: "targetDir",
      type: "input",
      message: "Which folder will you choose?\n",
      default: path.resolve(),
      filter: (value: string) => {
        return path.resolve(value);
      },
      validate: (value: string) => {
        try {
          const res = fs.readdirSync(path.resolve(value));
          if (res.length > 0) {
            throw new Error(
              "Directory is not empty! It's unsafe to create project here",
            );
          }
          return true;
        } catch (e) {
          if (isNodeError(e) && e.code === "ENOENT") {
            return true;
          }
          throw e;
        }
      },
    },
    {
      name: "projectName",
      type: "input",
      message: "Project name?",
      validate: (val: string) => val.length > 0,
    },
    {
      name: "repositoryUrl",
      type: "input",
      message: "Repository url. You can leave it empty, bro",
    },
    {
      name: "features",
      type: "checkbox",
      message: "Select features",
      choices: [
        { name: "e2e and unit test with jest", value: "tests", checked: true },
        { name: "init git repository", value: "initGit", checked: true },
      ],
    },
  ]);

  const { confirm } = await inquirer.prompt([
    {
      name: "confirm",
      type: "confirm",
      message: `What we got to do \n${JSON.stringify(
        results,
        null,
        2,
      )}\n Confirm?`,
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
    withTests: features.includes("tests"),
    initGitRepo: features.includes("initGit"),
  };
};
