import * as fs from "fs";
import * as path from "path";
import type { CommonFile, CommonDir, Template } from "./types";
import { TemplateRoot } from "./types";

// TODO: придумайте что-то получше
const resolvePackageRootDir = (): string => {
  return path.join(__dirname, "..", "..", "..");
};

export const resolveTemplatePath = (
  template: CommonFile | CommonDir | Template,
  root: TemplateRoot,
) => {
  const fileName =
    root === TemplateRoot.CommonFile ? `${template}.hbs` : template;

  const packageRootDir = resolvePackageRootDir();

  const templatePath = path.resolve(
    packageRootDir,
    "templates",
    root,
    fileName,
  );

  // TODO: exception handle
  fs.accessSync(templatePath);

  return templatePath;
};
