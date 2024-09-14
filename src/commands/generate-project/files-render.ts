import * as fs from "fs";
import * as handlebars from "handlebars";
import { resolveTemplatePath } from "./template-resolver";
import type { CommonFileDefinition } from "./types";
import { TemplateRoot } from "./types";

export const renderCommonFile = (defintion: CommonFileDefinition): string => {
  const tempatePath = resolveTemplatePath(
    defintion.type,
    TemplateRoot.CommonFile,
  );
  const templateStr = fs.readFileSync(tempatePath, "utf-8");

  const template = handlebars.compile(templateStr);
  const res = template(defintion.values);

  return res;
};
