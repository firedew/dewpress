import colors from 'picocolors'
import log from './utils/log'
import { resolveConfig } from './config/config'
import { copyAssets } from './assets'
import { getPages } from './pages'
import parseMarkdownFile from './markdown/parseMarkdownFile'

export async function build (root: string) {
  const start = Date.now()
  log.version();
  const config = await resolveConfig(root, 'build', 'development')
  const pages = await getPages(config)

  console.log(`Building from source: ${config.srcDir} to ${config.outDir}`)

  await Promise.all(
    pages.map(async (page) => {
      await parseMarkdownFile(page, config);
    })
  )

  await copyAssets(config)
  console.log(colors.green(`build complete in ${((Date.now() - start) / 1000).toFixed(2)}s.`))
}
