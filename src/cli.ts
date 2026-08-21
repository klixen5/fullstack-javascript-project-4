#!/usr/bin/env node
import { program } from 'commander'
import process from 'process'
import loader from './index.js'

interface LoaderOptions {
  output: string
}

program
  .name('page-loader')
  .description('Page loader utility')
  .version('0.0.1')
  .argument('<url>', 'Ссылка на страницу')
  .option('-o, --output <dir>', 'output dir (default: "/home/user/current-dir")', process.cwd())
  .action((url: string, options: LoaderOptions) => {
    loader(url, options.output).then((name) => console.log(name))
  })
  .parse(process.argv)
