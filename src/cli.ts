#!/usr/bin/env node
import { program } from 'commander'
import process from 'process'
import loader from './loader.js'

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
    try {
      new URL(url)
    } catch {
      console.error(`Ошибка: "${url}" не является корректным URL`)
      process.exit(1)
    }
    loader(url, options.output)
      .then((fullPath) => console.log(fullPath))
      .catch((err: Error) => {
        console.log(`Ошибка: ${err.message}`)
        process.exit(1)
      })
  })
  .parse(process.argv)
