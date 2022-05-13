import * as fs from 'fs';
import * as path from 'path';
import * as log from 'loglevel';
import { initGitRepo, setGitRemoteOrigin } from './actions';
import { renderCommonFile } from './files-render';
import { resolveTemplatePath } from './template-resolver';
import {
  getGenericTsDefinition,
  getNpmPackageDefinition,
} from './templates-definitions';
import type { TemplateDefinition, GenerateProjectArgs } from './types';
import { TEMPLATE, TEMPLATE_ROOT } from './types';

export const generateProject = (args: GenerateProjectArgs) => {
  const { projectName, withTests, repositoryUrl } = args;

  log.debug('Generate project task just started');

  const outDir = path.resolve(args.targetDir);
  let definition: TemplateDefinition;
  switch (args.template) {
    case TEMPLATE.NPM_PACKAGE:
      definition = getNpmPackageDefinition({
        projectName,
        repositoryUrl,
        withTests,
      });
      break;
    case TEMPLATE.GENERIC_TS:
      definition = getGenericTsDefinition({
        projectName,
        repositoryUrl,
        withTests,
      });
      break;
    default:
      return;
  }

  // Ensure out dir
  log.debug(`Ensure out dir "${outDir}"`);
  if (!fs.existsSync(outDir)) {
    log.debug('Out dir not exists, trying to create');
    fs.mkdirSync(outDir, { recursive: true });
    log.debug(`Created out dir "${outDir}"`);
  }

  if (fs.readdirSync(outDir).length > 0) {
    log.debug('Directory is not empty. Throw error');
    throw new Error('Directory is not empty');
  }

  // Copy main files
  const mainDir = resolveTemplatePath(definition.type, TEMPLATE_ROOT.TEMPLATE);

  log.debug(`Copying main files from "${mainDir}" to "${outDir}"`);
  fs.cpSync(mainDir, outDir, { recursive: true });

  // Copy common files
  log.debug('Copying common files');
  for (const commonFile of definition.commonFiles) {
    log.debug(
      `Rendering file "${commonFile.type}". Values:`,
      commonFile.values,
    );
    const res = renderCommonFile({
      type: commonFile.type,
      values: commonFile.values,
    });

    const outFile = path.resolve(outDir, commonFile.type);

    log.debug(`Write rendered "${commonFile.type}" to "${outFile}"`);
    fs.writeFileSync(outFile, res, 'utf-8');
  }

  // Copy common dirs
  log.debug('Copying common dirs');
  for (const dirName of definition.commonDirs) {
    const fromDir = resolveTemplatePath(dirName, TEMPLATE_ROOT.COMMON_DIR);
    const toDir = path.resolve(outDir, dirName);

    log.debug(`Copying from "${fromDir}" to ${toDir}`);

    fs.cpSync(fromDir, toDir, { recursive: true });
  }

  if (args.initGitRepo) {
    log.debug('Initialize git repo');

    initGitRepo(outDir);

    if (args.repositoryUrl.length > 0) {
      log.debug('Set git remote origin');
      setGitRemoteOrigin(outDir, args.repositoryUrl);
    }
  }

  log.debug('Project successfully generated!');
};
