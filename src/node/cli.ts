// import colors from 'picocolors'
import { Command } from 'commander'
import { build } from './build'

// console.log(colors.cyan(`DewPress v${require('../../package.json').version}`))

const program = new Command()

program
  .name('dewpress')
  .version(require('../../package.json').version)

program
  .command('build [source]')
  .description('build website, source defaults to src')
  .action((source = 'src') => {
    build(source)
  });

program.parse(process.argv)
