import { Answers, ConditionalAnswers } from '@/configs/questions';
import { Deps } from '@/utils/deps';
import { Files } from '@/utils/files';
import { Folders } from '@/utils/folders';

export type ActionType<T> = T | ((answers: Answers) => T);
export type Setup<T> = {
  [key: string]: ActionType<T>;
};

export type SetupMap<T, R extends string | number | boolean> = Record<
  `${R}`,
  Setup<T>
>;

export type ActionSetups<T extends string | number | boolean> = {
  deps: SetupMap<Deps, T>;
  files: SetupMap<Files, T>;
  folders: SetupMap<Folders, T>;
};

export type ActionMap = {
  [K in keyof ConditionalAnswers]: ActionSetups<ConditionalAnswers[K]>;
};

export type Action<T extends string | number | boolean> = (
  root: string,
  answers: Answers,
  setup: ActionSetups<T>,
  key: keyof ConditionalAnswers,
) => Promise<void>;
