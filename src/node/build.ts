import MarkdownIt from 'markdown-it'
import fs from 'fs'
import { resolve } from 'path'
import { globby } from 'globby'
import colors from 'picocolors'
import createHtml from './createHtml'

export async function build (source: string, dest: string) {
  console.log(colors.green(`Building from source: ${source}`))
  const md = MarkdownIt({
    html: true,
    linkify: true,
  })

  const pages = (
    await globby(['**.md'], {
      cwd: source,
    })
  ).sort()

  pages.forEach((page) => {
    const fileContent = fs.readFileSync(resolve(source, page), { encoding: 'utf-8' })
    const content = md.render(fileContent)

    createHtml(content, { dest, page })
  })
}
