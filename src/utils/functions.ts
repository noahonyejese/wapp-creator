import { Answers } from '@/configs/questions';
import { execa } from 'execa';
import fs from 'fs-extra';
import handlebars from 'handlebars';
import path from 'path';
import signale from 'signale';
import { Files } from './files';

export const installDeps = async (
  root: string,
  deps: string[] = [],
  devDeps: string[] = [],
) => {
  const isShellCommand = (dep: string) =>
    dep.trim().startsWith('npx ') || dep.trim().startsWith('pnpm dlx ');

  const shellCommands = deps.filter(isShellCommand);
  const actualDeps = deps.filter((dep) => !isShellCommand(dep));

  for (const command of shellCommands) {
    const [cmd, ...args] = command.split(' ');
    signale.info(`🚀 Running ${cmd} ${args.join(' ')}`);
    await execa(cmd, args, { cwd: root, stdio: 'inherit' });
  }

  if (actualDeps.length) {
    signale.info('📦 Installing dependencies...');
    await execa('pnpm', ['add', ...actualDeps], {
      cwd: root,
      stdio: 'inherit',
    });
  }

  if (devDeps.length) {
    signale.info('📦 Installing dev dependencies...');
    await execa('pnpm', ['add', '-D', ...devDeps], {
      cwd: root,
      stdio: 'inherit',
    });
  }
};

export const createFolders = async (root: string, folders: string[]) => {
  for (const folder of folders) {
    await fs.ensureDir(path.join(root, folder));
  }
};

export const generateFiles = async (
  root: string,
  templates: Files,
  context: Answers,
) => {
  for (const { from, to } of templates) {
    const tpl = await fs.readFile(from, 'utf8');
    const compiled = handlebars.compile(tpl);
    const content = compiled(context);
    await fs.outputFile(path.join(root, to), content);
  }
};
