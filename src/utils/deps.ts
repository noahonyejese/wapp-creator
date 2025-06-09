import { TemplateFramework } from '@/configs/questions';
import { Setup, SetupMap } from '@/types/utils';

export type Deps = string[];

const next: Setup<Deps> = {
  deps: ({ name, typescript }) => [
    `npx create-next-app@latest ${name} ${typescript ? '--ts' : '--js'} --turbopack --no-src-dir --app --use-pnpm --tailwind --eslint --import-alias '@/*' --empty`,
  ],
};

export const frameworkDeps: SetupMap<Deps, TemplateFramework> = {
  next,
};
