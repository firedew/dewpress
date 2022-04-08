import { preview as createViteServer } from 'vite'
import { defaultViteConfig } from './config/defaults'
import log from './utils/log'
import { DewPreviewOptions } from './types'
import { resolveConfig } from './config/config'

export async function preview (root: string, previewOptions: DewPreviewOptions) {
  log.version()
  previewOptions = {
    ...defaultViteConfig.preview,
    ...previewOptions,
    ...(previewOptions.skipOpen && { open: false })
  }
  const config = await resolveConfig(root, 'build', 'development')

  const server = await createViteServer({
    root,
    build: {
      outDir: config.outDir,
    },
    // base: config.site.base,
    // logLevel: 'warn',
    // plugins: createVitePressPlugin(root, config),
    preview: previewOptions
  })

  server.printUrls()
}
