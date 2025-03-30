import { createServer as createViteServer, ServerOptions } from 'vite'
import dewPressPlugin from './dewPressPlugin'
import { resolveConfig } from './config/config'
import log from './utils/log'

export async function dev(
  root: string = process.cwd(),
  serverOptions: ServerOptions = {}
) {
  log.version();
  const config = await resolveConfig(root)

  return createViteServer({
    root: config.srcDir,
    // base: config.base,
    // logLevel: 'warn',
    plugins: [dewPressPlugin(root, config)],
    server: serverOptions
  })
}
