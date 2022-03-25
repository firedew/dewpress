import MarkdownIt from 'markdown-it'
import fs from 'fs-extra'
import { resolve } from 'path'
import { globby } from 'globby'
import colors from 'picocolors'
import createHtml from './createHtml'
import log from './utils/log'
import { resolveConfig } from './config'

export async function build (root: string) {
  const start = Date.now()
  log.version();
  const config = await resolveConfig(root, 'build', 'development')

  console.log(`Building from source: ${root} to ${config.outDir}`)

  const md = MarkdownIt({
    html: true,
    linkify: true,
  })

  const pages = (
    await globby(['**.md'], {
      cwd: root,
    })
  ).sort()

  await Promise.all(
    pages.map(async (page) => {
      const fileContent = await fs.readFile(resolve(root, page), { encoding: 'utf-8' })
      const content = md.render(fileContent)

      await createHtml(content, { outDir: config.outDir, page })
    })
  )

  console.log(colors.green(`build complete in ${((Date.now() - start) / 1000).toFixed(2)}s.`))
}
