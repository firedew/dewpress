import { Command } from 'commander'
import { build } from './build'
import colors from 'picocolors'

console.log(colors.cyan(`dewpress v${require('../../package.json').version}`))

const program = new Command()

program
  .name('dewpress')
  .version(require('../../package.json').version)

program
  .command('build [source]')
  .description('build website, source defaults to src')
  .action((source = 'src') => {
    build(source, 'dist-docs')
  });

program.parse(process.argv)
