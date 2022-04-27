import { createServer as createViteServer, ServerOptions } from 'vite'
import dewPressPlugin from './plugin'
import { resolveConfig } from './config/config'

export async function dev(
  root: string = process.cwd(),
  serverOptions: ServerOptions = {}
) {
  const config = await resolveConfig(root)

  return createViteServer({
    root: config.srcDir,
    // base: config.base,
    // logLevel: 'warn',
    plugins: [dewPressPlugin(root, config)],
    server: serverOptions
  })
}
