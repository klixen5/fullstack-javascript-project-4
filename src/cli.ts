#!/usr/bin/env node

import { Command, Option } from 'commander';

interface Options {
  output: string | boolean;
}

const program = new Command();
const outputOption = new Option('-o, --output [dir]', 'output dir').default(process.cwd());

program
  .version('0.0.1')
  .addOption(outputOption)
  .argument('<url>')
  .action((url: string, options: Options) => {
    console.log(url);
    console.log(options);
  });

program.parse();
