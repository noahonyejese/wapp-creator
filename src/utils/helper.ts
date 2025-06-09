import type { Answers, ConditionalAnswers } from '@/configs/questions';
import chalk from 'chalk';
import { Falsy, PrevCaller, PromptObject, PromptType } from 'prompts';
import signale from 'signale';
import { setups } from './setup';

export const isValidKey = <K extends string>(
  key: string,
  map: Record<K, unknown>,
): key is K => {
  return key in map;
};

export const getConditionalActions = (answers: Answers) =>
  Object.keys(answers).filter(
    (key) => key in setups,
  ) as (keyof ConditionalAnswers)[];

export const ifProd = (type: PromptType): PrevCaller<PromptType, Falsy> =>
  ((_prev, values: Partial<Answers>) => {
    return values.type === 'prod' ? type : null;
  }) as PrevCaller<PromptType, Falsy>;

export const ifType = (
  conditions: Partial<Record<keyof Answers, any>>,
  promptType: PromptType,
): PrevCaller<PromptType, Falsy> =>
  ((_prev, values: Partial<Answers>) => {
    for (const [key, expected] of Object.entries(conditions)) {
      if ((values as any)[key] !== expected) return null;
    }
    return promptType;
  }) as PrevCaller<PromptType, Falsy>;

export const withFixedValue = <T extends PromptObject>(
  condition: boolean,
  value: any,
  base: T,
): T => {
  if (!condition) return base;
  return {
    ...base,
    type: null,
    initial: value,
    format: () => value,
  };
};

export const toArray = <T>(val: string | string[] | undefined): T => {
  if (!val) return [] as T;
  if (Array.isArray(val)) return val as T;
  return val.split(',').map((s) => s.trim()) as T;
};

type Resolver<T> = T | ((answers: Answers) => T);

export const resolveFn = <T>(
  input: Resolver<T> | undefined,
  answers: Answers,
): T => {
  if (typeof input === 'function') {
    return (input as (answers: Answers) => T)(answers);
  }
  return input as T;
};

export const log = (
  label: string,
  value: string | string[] | boolean | undefined,
  icon = '🔧',
) => {
  if (Array.isArray(value)) {
    signale.info(
      `${icon} ${chalk.cyan(label)}: ${chalk.magenta(value.join(', '))}`,
    );
  } else if (typeof value === 'boolean') {
    signale.info(
      `${icon} ${chalk.cyan(label)}: ${value ? chalk.green('Yes') : chalk.gray('No')}`,
    );
  } else if (value !== undefined) {
    signale.info(`${icon} ${chalk.cyan(label)}: ${chalk.magenta(value)}`);
  }
};

export const languageChoices = [
  { value: 'aa', title: 'Afar' },
  { value: 'ab', title: 'Abkhazian' },
  { value: 'ae', title: 'Avestan' },
  { value: 'af', title: 'Afrikaans' },
  { value: 'ak', title: 'Akan' },
  { value: 'am', title: 'Amharic' },
  { value: 'an', title: 'Aragonese' },
  { value: 'ar', title: 'Arabic' },
  { value: 'as', title: 'Assamese' },
  { value: 'av', title: 'Avaric' },
  { value: 'ay', title: 'Aymara' },
  { value: 'az', title: 'Azerbaijani' },
  { value: 'ba', title: 'Bashkir' },
  { value: 'be', title: 'Belarusian' },
  { value: 'bg', title: 'Bulgarian' },
  { value: 'bh', title: 'Bihari languages' },
  { value: 'bi', title: 'Bislama' },
  { value: 'bm', title: 'Bambara' },
  { value: 'bn', title: 'Bengali' },
  { value: 'bo', title: 'Tibetan' },
  { value: 'br', title: 'Breton' },
  { value: 'bs', title: 'Bosnian' },
  { value: 'ca', title: 'Catalan' },
  { value: 'ce', title: 'Chechen' },
  { value: 'ch', title: 'Chamorro' },
  { value: 'co', title: 'Corsican' },
  { value: 'cr', title: 'Cree' },
  { value: 'cs', title: 'Czech' },
  { value: 'cu', title: 'Church Slavic' },
  { value: 'cv', title: 'Chuvash' },
  { value: 'cy', title: 'Welsh' },
  { value: 'da', title: 'Danish' },
  { value: 'de', title: 'German' },
  { value: 'dv', title: 'Divehi' },
  { value: 'dz', title: 'Dzongkha' },
  { value: 'ee', title: 'Ewe' },
  { value: 'el', title: 'Greek' },
  { value: 'en', title: 'English' },
  { value: 'eo', title: 'Esperanto' },
  { value: 'es', title: 'Spanish' },
  { value: 'et', title: 'Estonian' },
  { value: 'eu', title: 'Basque' },
  { value: 'fa', title: 'Persian' },
  { value: 'ff', title: 'Fulah' },
  { value: 'fi', title: 'Finnish' },
  { value: 'fj', title: 'Fijian' },
  { value: 'fo', title: 'Faroese' },
  { value: 'fr', title: 'French' },
  { value: 'fy', title: 'Western Frisian' },
  { value: 'ga', title: 'Irish' },
  { value: 'gd', title: 'Scottish Gaelic' },
  { value: 'gl', title: 'Galician' },
  { value: 'gn', title: 'Guarani' },
  { value: 'gu', title: 'Gujarati' },
  { value: 'gv', title: 'Manx' },
  { value: 'ha', title: 'Hausa' },
  { value: 'he', title: 'Hebrew' },
  { value: 'hi', title: 'Hindi' },
  { value: 'ho', title: 'Hiri Motu' },
  { value: 'hr', title: 'Croatian' },
  { value: 'ht', title: 'Haitian' },
  { value: 'hu', title: 'Hungarian' },
  { value: 'hy', title: 'Armenian' },
  { value: 'hz', title: 'Herero' },
  { value: 'ia', title: 'Interlingua' },
  { value: 'id', title: 'Indonesian' },
  { value: 'ie', title: 'Interlingue' },
  { value: 'ig', title: 'Igbo' },
  { value: 'ii', title: 'Sichuan Yi' },
  { value: 'ik', title: 'Inupiaq' },
  { value: 'io', title: 'Ido' },
  { value: 'is', title: 'Icelandic' },
  { value: 'it', title: 'Italian' },
  { value: 'iu', title: 'Inuktitut' },
  { value: 'ja', title: 'Japanese' },
  { value: 'jv', title: 'Javanese' },
  { value: 'ka', title: 'Georgian' },
  { value: 'kg', title: 'Kongo' },
  { value: 'ki', title: 'Kikuyu' },
  { value: 'kj', title: 'Kuanyama' },
  { value: 'kk', title: 'Kazakh' },
  { value: 'kl', title: 'Kalaallisut' },
  { value: 'km', title: 'Khmer' },
  { value: 'kn', title: 'Kannada' },
  { value: 'ko', title: 'Korean' },
  { value: 'kr', title: 'Kanuri' },
  { value: 'ks', title: 'Kashmiri' },
  { value: 'ku', title: 'Kurdish' },
  { value: 'kv', title: 'Komi' },
  { value: 'kw', title: 'Cornish' },
  { value: 'ky', title: 'Kyrgyz' },
  { value: 'la', title: 'Latin' },
  { value: 'lb', title: 'Luxembourgish' },
  { value: 'lg', title: 'Ganda' },
  { value: 'li', title: 'Limburgan' },
  { value: 'ln', title: 'Lingala' },
  { value: 'lo', title: 'Lao' },
  { value: 'lt', title: 'Lithuanian' },
  { value: 'lu', title: 'Luba-Katanga' },
  { value: 'lv', title: 'Latvian' },
  { value: 'mg', title: 'Malagasy' },
  { value: 'mh', title: 'Marshallese' },
  { value: 'mi', title: 'Maori' },
  { value: 'mk', title: 'Macedonian' },
  { value: 'ml', title: 'Malayalam' },
  { value: 'mn', title: 'Mongolian' },
  { value: 'mr', title: 'Marathi' },
  { value: 'ms', title: 'Malay' },
  { value: 'mt', title: 'Maltese' },
  { value: 'my', title: 'Burmese' },
  { value: 'na', title: 'Nauru' },
  { value: 'nb', title: 'Norwegian Bokmål' },
  { value: 'nd', title: 'North Ndebele' },
  { value: 'ne', title: 'Nepali' },
  { value: 'ng', title: 'Ndonga' },
  { value: 'nl', title: 'Dutch' },
  { value: 'nn', title: 'Norwegian Nynorsk' },
  { value: 'no', title: 'Norwegian' },
  { value: 'nr', title: 'South Ndebele' },
  { value: 'nv', title: 'Navajo' },
  { value: 'ny', title: 'Chichewa' },
  { value: 'oc', title: 'Occitan' },
  { value: 'oj', title: 'Ojibwa' },
  { value: 'om', title: 'Oromo' },
  { value: 'or', title: 'Oriya' },
  { value: 'os', title: 'Ossetian' },
  { value: 'pa', title: 'Punjabi' },
  { value: 'pi', title: 'Pali' },
  { value: 'pl', title: 'Polish' },
  { value: 'ps', title: 'Pashto' },
  { value: 'pt', title: 'Portuguese' },
  { value: 'qu', title: 'Quechua' },
  { value: 'rm', title: 'Romansh' },
  { value: 'rn', title: 'Rundi' },
  { value: 'ro', title: 'Romanian' },
  { value: 'ru', title: 'Russian' },
  { value: 'rw', title: 'Kinyarwanda' },
  { value: 'sa', title: 'Sanskrit' },
  { value: 'sc', title: 'Sardinian' },
  { value: 'sd', title: 'Sindhi' },
  { value: 'se', title: 'Northern Sami' },
  { value: 'sg', title: 'Sango' },
  { value: 'si', title: 'Sinhala' },
  { value: 'sk', title: 'Slovak' },
  { value: 'sl', title: 'Slovenian' },
  { value: 'sm', title: 'Samoan' },
  { value: 'sn', title: 'Shona' },
  { value: 'so', title: 'Somali' },
  { value: 'sq', title: 'Albanian' },
  { value: 'sr', title: 'Serbian' },
  { value: 'ss', title: 'Swati' },
  { value: 'st', title: 'Southern Sotho' },
  { value: 'su', title: 'Sundanese' },
  { value: 'sv', title: 'Swedish' },
  { value: 'sw', title: 'Swahili' },
  { value: 'ta', title: 'Tamil' },
  { value: 'te', title: 'Telugu' },
  { value: 'tg', title: 'Tajik' },
  { value: 'th', title: 'Thai' },
  { value: 'ti', title: 'Tigrinya' },
  { value: 'tk', title: 'Turkmen' },
  { value: 'tl', title: 'Tagalog' },
  { value: 'tn', title: 'Tswana' },
  { value: 'to', title: 'Tonga' },
  { value: 'tr', title: 'Turkish' },
  { value: 'ts', title: 'Tsonga' },
  { value: 'tt', title: 'Tatar' },
  { value: 'tw', title: 'Twi' },
  { value: 'ty', title: 'Tahitian' },
  { value: 'ug', title: 'Uighur' },
  { value: 'uk', title: 'Ukrainian' },
  { value: 'ur', title: 'Urdu' },
  { value: 'uz', title: 'Uzbek' },
  { value: 've', title: 'Venda' },
  { value: 'vi', title: 'Vietnamese' },
  { value: 'vo', title: 'Volapük' },
  { value: 'wa', title: 'Walloon' },
  { value: 'wo', title: 'Wolof' },
  { value: 'xh', title: 'Xhosa' },
  { value: 'yi', title: 'Yiddish' },
  { value: 'yo', title: 'Yoruba' },
  { value: 'za', title: 'Zhuang' },
  { value: 'zh', title: 'Chinese' },
  { value: 'zu', title: 'Zulu' },
] as const;

export type LanguageCode = (typeof languageChoices)[number]['value'];
