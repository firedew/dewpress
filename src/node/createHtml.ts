import path from 'path'
import fs from 'fs-extra'

const baseTemplate = fs.readFileSync(path.join(__dirname, './templates/index.html'), { encoding: 'utf-8' })

export default async function (content: string, { config, page, data, template, client }: any, writeFile = true) {
  template = template || baseTemplate
  const html = template
    .replace(/\${lang}/g, config.lang)
    .replace(/\${title}/g, [config.title, data.title].filter(t => !!t).join(' | '))
    .replace(/\${description}/g, config.description)
    .replace(/\${head\.raw}/g, config.head.raw)
    .replace(/\${content}/g, content + (client ?? ''))

  if(writeFile) {
    const htmlFileName = path.join(config.outDir, page.replace(/\.md$/, '.html'))
    await fs.ensureDir(path.dirname(htmlFileName))
    await fs.writeFile(htmlFileName, html)
  }

  return html;
}
