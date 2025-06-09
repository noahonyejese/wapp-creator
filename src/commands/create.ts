import { askWappQuestions } from '@/configs/form';
import { createProject } from '@/configs/project';
import { Answers } from '@/configs/questions';
import { log, toArray } from '@/utils/helper';
import chalk from 'chalk';
import signale from 'signale';

export const createWapp = async (options: Partial<Answers>) => {
  const normalizedOptions: Partial<Answers> = {
    ...options,
    languages: toArray<Answers['languages']>(options.languages),
    testing: toArray<Answers['testing']>(options.testing),
    analytics: toArray<Answers['analytics']>(options.analytics),
    functionalities: toArray<Answers['functionalities']>(
      options.functionalities,
    ),
  };

  const answers = await askWappQuestions(normalizedOptions);
  await createProject(answers);

  signale.success(
    chalk.green(`🎉 Created ${answers.type} project: ${answers.name}`),
  );
  console.log();
  signale.note(chalk.yellow('📝 Project Configuration Summary:'));
  log('Framework', answers.framework, '🧰');
  log('Design System', answers.design, '🎨');
  // log('Monorepo', answers.monorepo, '📦');
  log('TypeScript', answers.typescript, '📘');
  log('Testing', answers.testing, '🧪');
  log('Analytics', answers.analytics, '📊');
  log('i18n Enabled', answers.i18n, '🌍');
  log('Languages', answers.languages, '🌐');
  log('SEO', answers.seo, '🔍');
  log(' Server', answers.server, '🛰️');
  log('Functionalities', answers.functionalities, '🚀');
  console.log();
};
