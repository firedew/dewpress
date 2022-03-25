import colors from 'picocolors'

function version () {
  info(`dewpress v${require('../../package.json').version}`)
}

function info (message: string) {
  console.log(colors.cyan(message))
}

function success (message: string) {
  console.log(colors.green(message))
}

function error (message: string) {
  console.log(colors.red(message))
}

function warning (message: string) {
  console.log(colors.yellow(message))
}

export default {
  version,
  info,
  success,
  error,
  warning,
}
