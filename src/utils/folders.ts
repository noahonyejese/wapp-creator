import { Answers } from '@/configs/questions';
import { Setup, SetupMap } from '@/types/utils';

export type Folders = string[];

const next: Setup<Folders> = {
  base: ({ type, typescript }) => [
    'components',
    typescript ? 'types' : '',
    'utils',
    ...(type === 'prod'
      ? [
          'public',
          'public/assets',
          'context',
          'hooks',
          'store',
          'styles',
          'styles/global.css',
        ]
      : []),
  ],
};
export const frameworkFolders: SetupMap<Folders, Answers['framework']> = {
  next,
};
