import { ConditionalAnswers } from '@/configs/questions';
import { Action } from '@/types/utils';
import { Deps } from './deps';
import { Files } from './files';
import { Folders } from './folders';
import { createFolders, generateFiles, installDeps } from './functions';
import { isValidKey, resolveFn } from './helper';

export const handleAction: Action<
  ConditionalAnswers[keyof ConditionalAnswers]
> = async (root, answers, setup, key) => {
  const rawKey = answers[key];
  const resolvedKey = String(rawKey);

  if (
    !isValidKey(resolvedKey, setup.deps) ||
    !isValidKey(resolvedKey, setup.files) ||
    !isValidKey(resolvedKey, setup.folders)
  ) {
    return;
  }

  const deps = resolveFn<Deps>(setup.deps[resolvedKey]?.deps, answers);
  const devDeps = resolveFn<Deps>(setup.deps[resolvedKey]?.devDeps, answers);
  if (deps.length || devDeps.length) {
    await installDeps(root, deps, devDeps);
  }

  const folders = resolveFn<Folders>(setup.folders[resolvedKey]?.base, answers);
  if (folders.length) {
    await createFolders(root, folders);
  }

  const files = resolveFn<Files>(setup.files[resolvedKey]?.base, answers);
  if (files.length) {
    await generateFiles(root, files, answers);
  }
};
