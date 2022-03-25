import { Command } from 'commander'
import { build } from './build'
import { preview } from './preview'
import defaults from './defaults'

const program = new Command()

program
  .name('dewpress')
  .version(require('../../package.json').version)

program
  .command('build [source] [dest]')
  .description(`build website, source defaults to ${defaults.source} and dest defaults to [source]/${defaults.dest}`)
  .action(async (source: string, dest: string) => {
    await build(source, dest)
  });

program
  .command('preview [source] [dest]')
  .option('-p, --port <port>', 'Port to start the server on')
  .option('--skip-open', 'Skip opening browser')
  .description(`preview the website, source defaults to ${defaults.source} and dest defaults to [source]/${defaults.dest}`)
  .action(async (source: string, dest: string, options) => {
    await preview(source, dest, options)
  });

program.parse(process.argv)
