import * as fs from 'fs';
import * as path from 'path';
import type { COMMON_FILE, COMMON_DIR, TEMPLATE } from './types';
import { TEMPLATE_ROOT } from './types';

// TODO: придумайте что-то получше
const resolvePackageRootDir = (): string => {
  return path.join(__dirname, '..', '..', '..');
};

export const resolveTemplatePath = (
  template: COMMON_FILE | COMMON_DIR | TEMPLATE,
  root: TEMPLATE_ROOT,
) => {
  const fileName =
    root === TEMPLATE_ROOT.COMMON_FILE ? `${template}.hbs` : template;

  const packageRootDir = resolvePackageRootDir();

  const templatePath = path.resolve(
    packageRootDir,
    'templates',
    root,
    fileName,
  );

  // TODO: exception handle
  fs.accessSync(templatePath);

  return templatePath;
};
