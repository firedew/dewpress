import MarkdownIt from 'markdown-it'
import fs from 'fs-extra'
import { resolve } from 'path'
import { globby } from 'globby'
import colors from 'picocolors'
import createHtml from './createHtml'
import log from './utils/log'
import matter from 'gray-matter'
import { resolveConfig } from './config/config'

export async function build (root: string) {
  const start = Date.now()
  log.version();
  const config = await resolveConfig(root, 'build', 'development')

  console.log(`Building from source: ${config.srcDir} to ${config.outDir}`)

  const md = MarkdownIt({
    html: true,
    linkify: true,
  })

  const pages = (
    await globby(['**.md'], {
      cwd: config.srcDir,
    })
  ).sort()

  await Promise.all(
    pages.map(async (page) => {
      const fileContent = await fs.readFile(resolve(config.srcDir!, page), { encoding: 'utf-8' })
      const processedContent = matter(fileContent)
      const content = md.render(processedContent.content)

      await createHtml(content, { config, page, data: processedContent.data })
    })
  )

  console.log(colors.green(`build complete in ${((Date.now() - start) / 1000).toFixed(2)}s.`))
}
