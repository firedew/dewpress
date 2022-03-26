import path from 'path'
import fs from 'fs-extra'

export default async function (content: any, { config, page, data }: any) {
  const html = `
<!DOCTYPE html>
<html lang="${config.lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${[config.title, data.title].filter(t => !!t).join(' | ')}</title>
    <meta name="description" content="${config.description}">
    ${config.head.raw}
  </head>
  <body>
    <div id="app">${content}</div>
  </body>
</html>`.trim()
  const htmlFileName = path.join(config.outDir, page.replace(/\.md$/, '.html'))
  await fs.ensureDir(path.dirname(htmlFileName))
  await fs.writeFile(htmlFileName, html)
}
