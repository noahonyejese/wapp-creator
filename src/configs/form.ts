import prompts from 'prompts';
import { Answers, wappCreationQuestions } from './questions';

export const askWappQuestions = async (
  partial: Partial<Answers>,
): Promise<Answers> => {
  const unanswered = wappCreationQuestions.filter((q) => {
    const key = q.name as keyof Answers;
    return partial[key] === undefined;
  });

  const answers = await prompts(unanswered);

  return {
    name: partial.name ?? answers.name,
    type: partial.type ?? answers.type,
    framework: partial.framework ?? answers.framework,
    typescript: partial.typescript ?? answers.typescript,
    design: partial.design ?? answers.design,
    // monorepo: partial.monorepo ?? answers.monorepo,
    testing: partial.testing ?? answers.testing,
    analytics: partial.analytics ?? answers.analytics,
    i18n: partial.i18n ?? answers.i18n,
    languages: partial.languages ?? answers.languages,
    seo: partial.seo ?? answers.seo,
    server: partial.server ?? answers.server,
    functionalities: partial.functionalities ?? answers.functionalities,
  };
};
