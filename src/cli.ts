#!/usr/bin/env node

import path from 'node:path';
import { Command, Option } from 'commander';


import downLoadHtml from './downloadPage.js';
import saveFile from './storage.js';
import { generateFilename } from './utils.js';

interface Options {
  output: string;
}

const program = new Command();
const outputOption = new Option('-o, --output <dir>', 'output dir').default(process.cwd());

program
  .version('0.0.1')
  .addOption(outputOption)
  .argument('<url>')
  .action((url: string, options: Options) => {
    const fileName = path.join(path.resolve(options.output), generateFilename(url, 'html'));
    downLoadHtml(url)
      .then((data) => saveFile(fileName, data))
      .then(() => console.log('success'));
  });

program.parse();
