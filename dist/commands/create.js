import chalk from 'chalk';
export const createWapp = (options) => {
    const name = options.name ?? 'default-app';
    console.log(chalk.green(`🎉 Creating project: ${name}`));
};
