import { createServer as createViteServer } from 'vite'
import path, { join } from 'path'
import defaults from './defaults'
import log from './utils/log'
import { DewPreviewOptions } from './types'

export async function preview (source: string, dest: string, previewOptions: DewPreviewOptions) {
  log.version()
  previewOptions = {
    ...defaults.preview,
    ...previewOptions,
    ...(previewOptions.skipOpen && { open: false })
  }

  dest = dest || join(source, defaults.dest)

  const root = path.resolve(dest)
  const server = await createViteServer({
    configFile: false,
    root,
    // base: config.site.base,
    // logLevel: 'warn',
    // plugins: createVitePressPlugin(root, config),
    server: previewOptions
  })

  await server.listen()

  server.printUrls()
}
