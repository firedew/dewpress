import MarkdownIt from 'markdown-it'
import fs from 'fs-extra'
import { resolve } from 'path'
import colors from 'picocolors'
import createHtml from './createHtml'
import log from './utils/log'
import matter from 'gray-matter'
import { resolveConfig } from './config/config'
import { copyAssets } from './assets'
import { getPages } from './pages'

export async function build (root: string) {
  const start = Date.now()
  log.version();
  const config = await resolveConfig(root, 'build', 'development')
  const pages = await getPages(config)

  console.log(`Building from source: ${config.srcDir} to ${config.outDir}`)

  const md = MarkdownIt({
    html: true,
    linkify: true,
  })

  await Promise.all(
    pages.map(async (page) => {
      const fileContent = await fs.readFile(resolve(config.srcDir!, page), { encoding: 'utf-8' })
      const processedContent = matter(fileContent)
      const content = md.render(processedContent.content)

      await createHtml(content, { config, page, data: processedContent.data })
    })
  )

  await copyAssets(config)
  console.log(colors.green(`build complete in ${((Date.now() - start) / 1000).toFixed(2)}s.`))
}
