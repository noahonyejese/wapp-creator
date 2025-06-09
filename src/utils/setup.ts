import { TemplateFramework } from '@/configs/questions';
import { ActionMap, ActionSetups } from '@/types/utils';
import { frameworkDeps } from './deps';
import { frameworkFiles } from './files';
import { frameworkFolders } from './folders';

const framework: ActionSetups<TemplateFramework> = {
  deps: frameworkDeps,
  files: frameworkFiles,
  folders: frameworkFolders,
};

export const setups: ActionMap = {
  framework,
};
