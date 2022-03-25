import { Command } from 'commander'
import { build } from './build'
import { preview } from './preview'
import defaults from './defaults'

const program = new Command()

program
  .name('dewpress')
  .version(require('../../package.json').version)

program
  .command('build [root]')
  .description(`build website, root defaults to ${defaults.root}`)
  .action(async (root: string) => {
    await build(root)
  });

program
  .command('preview [root]')
  .option('-p, --port <port>', 'Port to start the server on')
  .option('--skip-open', 'Skip opening browser')
  .description(`preview the website, root defaults to ${defaults.root}`)
  .action(async (root: string, options) => {
    await preview(root, options)
  });

program.parse(process.argv)
