#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATE_DIR = path.join(__dirname, '../template');

async function initializeGit(targetDir) {
  try {
    // 初始化 git 仓库
    await execAsync('git init', { cwd: targetDir });
    
    // 添加所有文件到暂存区
    await execAsync('git add .', { cwd: targetDir });
    
    // 创建首次提交
    await execAsync('git commit -m "Initial commit from create-chrome-ext-app"', { 
      cwd: targetDir,
      env: {
        ...process.env,
        // 设置基本的 git 配置，以防用户没有全局配置
        GIT_AUTHOR_NAME: 'Chrome Extension Creator',
        GIT_AUTHOR_EMAIL: 'chrome-ext@example.com',
        GIT_COMMITTER_NAME: 'Chrome Extension Creator',
        GIT_COMMITTER_EMAIL: 'chrome-ext@example.com',
      }
    });
    
    console.log(chalk.green('Git repository has been initialized'));
  } catch (error) {
    console.warn(chalk.yellow('Failed to initialize git repository:'), error.message);
  }
}

async function init() {
  program
    .name('create-chrome-ext-app')
    .description('CLI tool for creating Chrome extensions with Vite and TypeScript')
    .argument('[name]', 'Project name')
    .action(async (name) => {
      let projectName = name;
      let shouldInitGit = true;
      
      if (!projectName) {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'projectName',
            message: 'What is your project name?',
            default: 'my-chrome-extension'
          },
          {
            type: 'confirm',
            name: 'initGit',
            message: 'Initialize a git repository?',
            default: true
          }
        ]);
        projectName = answers.projectName;
        shouldInitGit = answers.initGit;
      } else {
        // 如果直接提供了项目名，仍然询问是否初始化 git
        const answer = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'initGit',
            message: 'Initialize a git repository?',
            default: true
          }
        ]);
        shouldInitGit = answer.initGit;
      }

      const targetDir = path.join(process.cwd(), projectName);

      if (fs.existsSync(targetDir)) {
        console.error(chalk.red(`Directory ${projectName} already exists!`));
        process.exit(1);
      }

      console.log(chalk.blue(`Creating project in ${targetDir}...`));

      // Copy template files
      await fs.copy(TEMPLATE_DIR, targetDir);

      // Update package.json
      const packageJsonPath = path.join(targetDir, 'package.json');
      const packageJson = await fs.readJson(packageJsonPath);
      packageJson.name = projectName;
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

      // Initialize git repository
      if (shouldInitGit) {
        await initializeGit(targetDir);
      }

      console.log(chalk.green('\nProject created successfully!'));
      console.log('\nTo get started:');
      console.log(chalk.cyan(`\n  cd ${projectName}`));
      console.log(chalk.cyan('  npm install'));
      console.log(chalk.cyan('  npm run dev'));
    });

  program.parse();
}

init().catch(console.error); 