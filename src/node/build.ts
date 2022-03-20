import MarkdownIt from 'markdown-it'
import fs from 'fs'
import { resolve } from 'path'
import { globby } from 'globby'
import colors from 'picocolors'

export async function build (source: string) {
  console.log(colors.cyan(`Building from source: ${source}`))
  const md = MarkdownIt({
    html: true,
    linkify: true,
  })

  const pages = (
    await globby(['**.md'], {
      cwd: source,
    })
  ).sort()
  // const dir = fs.readdirSync(source)
  console.log(pages)
  pages.forEach((page) => {
    const content = fs.readFileSync(resolve(source, page), { encoding: 'utf-8' })
    console.log(md.render(content))
  })
}
