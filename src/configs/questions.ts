import {
  ifProd,
  ifType,
  languageChoices,
  LanguageCode,
  withFixedValue,
} from '@/utils/helper';
import { Choice, PromptObject } from 'prompts';

export type TemplateType = 'exploration' | 'prod';
export type TemplateFramework = 'next';
export type TemplateDesign = 'shadcn';
export type TemplateTesting = 'cypress' | 'jest' | 'k6' | 'playwright';
export type TemplateAnalytics =
  | 'google-analytics'
  | 'mixpanel'
  | 'vercel-analytics'
  | 'vercel-performance';
export type TemplateFunctionalities =
  | 'nextauth'
  | 'accent'
  | 'stripe'
  | 'firestore'
  | 'supabase'
  | 'rtdb-firebase'
  | 'storage-firebase'
  | 'cloud-functions-firebase'
  | 'resend'
  | 'sentry'
  | 'zustand';
export type TemplateServer = 'trpc' | 'next-api';
export type Answers = {
  name: string;
  type: TemplateType;
  framework: TemplateFramework;
  typescript: boolean;
  design: TemplateDesign;
  //   monorepo: boolean;
  testing: TemplateTesting;
  analytics: TemplateAnalytics;
  i18n: boolean;
  languages: LanguageCode[];
  seo: boolean;
  server: TemplateServer;
  functionalities: TemplateFunctionalities[];
};

export type ConditionalAnswers = Omit<
  Answers,
  'languages' | 'functionalities' | 'name'
>;

const askAppName: PromptObject = {
  type: 'text',
  name: 'name',
  message: 'What is the project name?',
  initial: 'my-app',
};

const askAppType: PromptObject = {
  type: 'select',
  name: 'type',
  message: 'What kind of app is this?',
  choices: [
    { title: 'Production', value: 'prod' },
    { title: 'Exploration', value: 'exploration' },
  ],
};

const askAppFramework: PromptObject = {
  type: 'select',
  name: 'framework',
  message: 'What kind of framework would you like to use?',
  choices: [{ title: 'Nextjs', value: 'next' }],
};

const askAppTypescript: PromptObject = {
  type: 'toggle',
  name: 'typescript',
  message: 'Would you like to use TypeScript?',
  initial: true,
};

const askAppDesign: PromptObject = {
  type: 'select',
  name: 'design',
  message: 'What kind of design system would you like to use?',
  choices: [{ title: 'Shadcn', value: 'shadcn' }],
};

// const askAppMonorepo: PromptObject = {
//   type: ifProd('toggle'),
//   name: 'monorepo',
//   message: 'Would you like to use a monorepo?',
//   initial: false,
// };

const askAppTesting: PromptObject = {
  type: ifProd('multiselect'),
  name: 'testing',
  message: 'What kind of testing would you like to use?',
  choices: [
    { title: 'Cypress', value: 'cypress' },
    { title: 'Jest', value: 'jest' },
    { title: 'K6', value: 'k6' },
    { title: 'Playwright', value: 'playwright' },
  ],
};

const askAppAnalytics: PromptObject = {
  type: ifProd('multiselect'),
  name: 'analytics',
  message: 'What kind of analytics would you like to use?',
  choices: [
    { title: 'Google Analytics', value: 'google-analytics' },
    { title: 'Mixpanel', value: 'mixpanel' },
    { title: 'Vercel Analytics', value: 'vercel-analytics' },
    { title: 'Vercel Performance', value: 'vercel-performance' },
  ],
};

const askAppTranslations: PromptObject = {
  type: ifProd('toggle'),
  name: 'i18n',
  message: 'Would you like to use translations?',
  initial: false,
};

const askAppLanguage: PromptObject = withFixedValue(false, ['en'], {
  type: ifType({ i18n: true, type: 'prod' }, 'autocompleteMultiselect'),
  name: 'languages',
  message:
    'What languages would you like to use? (note English is always included)',
  fixedValues: ['en'],
  choices: languageChoices as unknown as Choice[],
});

const askAppSeo: PromptObject = {
  type: ifType({ type: 'prod', framework: 'next' }, 'toggle'),
  name: 'seo',
  message: 'Would you like to use SEO?',
  initial: false,
};

const askAppServer: PromptObject = {
  type: ifType({ type: 'prod', framework: 'next' }, 'select'),
  name: 'server',
  message: 'What server type would you like to use?',
  choices: [
    {
      title: 'TRPC',
      value: 'trpc',
    },
    {
      title: 'Next API',
      value: 'next-api',
    },
  ],
};

const askAppFunctionalities: PromptObject = {
  type: ifType({ type: 'prod', framework: 'next' }, 'autocompleteMultiselect'),
  name: 'functionalities',
  message: 'What functionalities would you like to use?',
  choices: [
    {
      title: 'Authentication - NextAuth',
      value: 'nextauth',
    },
    {
      title: 'Accent - CMS',
      value: 'accent',
    },
    {
      title: 'Stripe - Payments',
      value: 'stripe',
    },
    {
      title: 'NoSQL Database - Firestore',
      value: 'firestore',
    },
    {
      title: 'SQL Database - Supabase',
      value: 'supabase',
    },
    {
      title: 'RTDB - Firebase',
      value: 'rtdb-firebase',
    },
    {
      title: 'Storage - Firebase',
      value: 'storage-firebase',
    },
    {
      title: 'Cloud Functions - Firebase',
      value: 'cloud-functions-firebase',
    },
    {
      title: 'Email Service - Resend',
      value: 'resend',
    },
    {
      title: 'Error handling - Sentry',
      value: 'sentry',
    },
    {
      title: 'State Management - Zustand',
      value: 'zustand',
    },
  ],
};

export const wappCreationQuestions = [
  askAppName,
  askAppType,
  askAppFramework,
  askAppTypescript,
  askAppDesign,
  //   askAppMonorepo,
  askAppTesting,
  askAppAnalytics,
  askAppTranslations,
  askAppLanguage,
  askAppSeo,
  askAppServer,
  askAppFunctionalities,
];
