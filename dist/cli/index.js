import { createWapp } from '@/commands/create';
import { Command } from 'commander';
const program = new Command();
program.name('wapp').description('Wapp CLI').version('0.1.0');
program
    .command('create')
    .description('Create a new project')
    .option('-n, --name <name>', 'Project name')
    .action(createWapp);
program.parse();
