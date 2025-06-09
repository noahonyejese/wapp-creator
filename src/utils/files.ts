import { Answers } from '@/configs/questions';
import { Setup, SetupMap } from '@/types/utils';

type File = {
  from: string;
  to: string;
};
export type Files = File[];

const next: Setup<Files> = { base: ({ type, typescript }) => [] };
export const frameworkFiles: SetupMap<Files, Answers['framework']> = {
  next,
};
