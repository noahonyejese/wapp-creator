import { createWapp } from '@/commands/create';
import { languageChoices } from '@/utils/helper';
import { Command } from 'commander';

const program = new Command();

program.name('wapp').description('Wapp CLI').version('1.0.0');

program
  .command('create')
  .description('Create a new project')
  .option('-n, --name <name>', 'Project name')
  .option('-t, --type <type>', 'App type (prod|exploration)')
  .option('-f, --framework <framework>', 'Framework (next|vite)')
  .option('-d, --design <design>', 'Design system (shadcn)')
  .option('-m, --monorepo', 'Use monorepo')
  .option('-T, --typescript', 'Use TypeScript') // ⬅️ no short flag, or use `-T`
  .option('--testing <testing>', 'Testing frameworks (comma-separated)')
  .option('-a, --analytics <analytics>', 'Analytics (comma-separated)')
  .option('-i, --i18n', 'Enable i18n') // ⬅️ boolean flag
  .option('-l, --languages <languages>', `Languages (comma-separated): ${languageChoices.map((l) => l.value).join(', ')}`)
  .option('-s, --seo', 'Enable SEO')
  .option('-S, --server <server>', 'Server (trpc|next-api)')
  .option('-F, --functionalities <functionalities>', 'Functionalities (comma-separated)')
  .action(createWapp);
program.parse();