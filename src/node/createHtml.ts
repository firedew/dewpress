import * as path from 'node:path'
import * as fs from 'fs'
import * as fsExtra from 'fs-extra'
import createHtmlHead from './createHtmlHead'

const baseTemplate = fs.readFileSync(path.join(__dirname, './templates/index.html'), { encoding: 'utf-8' })

export default async function (content: string, { config, page, data, template }: any) {
  template = template || baseTemplate
  const html = template
    .replace(/\${lang}/g, config.lang)
    .replace(/\${head}/g, createHtmlHead(config, data))
    .replace(/\${content}/g, content)

  const htmlFileName = path.join(config.outDir, page.replace(/\.md$/, '.html'))
  await fsExtra.ensureDir(path.dirname(htmlFileName))
  await fsExtra.writeFile(htmlFileName, html)

  return html;
}
