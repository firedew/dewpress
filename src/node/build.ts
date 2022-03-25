import MarkdownIt from 'markdown-it'
import fs from 'fs-extra'
import { resolve, join } from 'path'
import { globby } from 'globby'
import colors from 'picocolors'
import createHtml from './createHtml'
import log from './utils/log'
import defaults from './defaults'

export async function build (source: string, dest: string) {
  const start = Date.now()
  log.version();
  dest = dest || join(source, defaults.dest)
  console.log(`Building from source: ${source} to ${dest}`)

  const md = MarkdownIt({
    html: true,
    linkify: true,
  })

  const pages = (
    await globby(['**.md'], {
      cwd: source,
    })
  ).sort()

  await Promise.all(
    pages.map(async (page) => {
      const fileContent = await fs.readFile(resolve(source, page), { encoding: 'utf-8' })
      const content = md.render(fileContent)

      await createHtml(content, { dest, page })
    })
  )

  console.log(colors.green(`build complete in ${((Date.now() - start) / 1000).toFixed(2)}s.`))
}
