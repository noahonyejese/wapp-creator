import { ActionSetups } from '@/types/utils';
import { handleAction } from '@/utils/actions';
import { getConditionalActions } from '@/utils/helper';
import { setups } from '@/utils/setup';
import fs from 'fs-extra';
import path from 'path';
import signale from 'signale';
import { Answers, ConditionalAnswers } from './questions';

const getProjectRoot = () => path.resolve(process.cwd(), 'generated');

export const createProject = async (answers: Answers) => {
  const root = getProjectRoot();
  signale.start(`Creating project at ${root}`);
  await fs.ensureDir(root);

  for (const key of getConditionalActions(answers)) {
    const setup = setups[key];
    if (!setup) {
      signale.warn(`No setup found for ${key}`);
      continue;
    }

    await handleAction(
      root,
      answers,
      setup as ActionSetups<ConditionalAnswers[typeof key]>,
      key,
    );
  }

  signale.success(`🎉 Project ${answers.name} is ready.`);
};
