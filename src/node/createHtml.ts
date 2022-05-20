import path from 'path'
import fs from 'fs-extra'
import createHtmlHead from './createHtmlHead'

const baseTemplate = fs.readFileSync(path.join(__dirname, './templates/index.html'), { encoding: 'utf-8' })

export default async function (content: string, { config, page, data, template }: any) {
  template = template || baseTemplate
  const html = template
    .replace(/\${lang}/g, config.lang)
    .replace(/\${head}/g, createHtmlHead(config, data))
    .replace(/\${content}/g, content)

  const htmlFileName = path.join(config.outDir, page.replace(/\.md$/, '.html'))
  await fs.ensureDir(path.dirname(htmlFileName))
  await fs.writeFile(htmlFileName, html)

  return html;
}
