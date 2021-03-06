import { Command } from 'commander'
import { build } from './build'
import { preview } from './preview'
import { dev } from './dev'
import { defaultDewConfig } from './config/defaults'

const program = new Command()

program
  .name('dewpress')
  .version(require('../../package.json').version)

program
  .command('dev [srcDir]')
  .description(`develop website, srcDir defaults to ${defaultDewConfig.srcDir}`)
  .action(async (srcDir: string) => {
    const server = await dev(srcDir)
    await server.listen()
    server.printUrls()
  });

program
  .command('build [srcDir]')
  .description(`build website, srcDir defaults to ${defaultDewConfig.srcDir}`)
  .action(async (srcDir: string) => {
    await build(srcDir)
  });

program
  .command('preview [srcDir]')
  .option('-p, --port <port>', 'Port to start the server on')
  .option('--skip-open', 'Skip opening browser')
  .description(`preview the website, srcDir defaults to ${defaultDewConfig.srcDir}`)
  .action(async (srcDir: string, options) => {
    await preview(srcDir, options)
  });

program.parse(process.argv)
