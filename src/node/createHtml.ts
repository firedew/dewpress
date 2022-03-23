import path from 'path'
import fs from 'fs'

export default function (content: any, { dest, page }: any) {
  const title = 'My first title'
  const siteData = {
    lang: 'en',
    description: 'My first title',
  }
  const html = `
<!DOCTYPE html>
<html lang="${siteData.lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${title}</title>
    <meta name="description" content="${
    siteData.description
  }">
  </head>
  <body>
    <div id="app">${content}</div>
  </body>
</html>`.trim()
  const htmlFileName = path.join(dest, page.replace(/\.md$/, '.html'))
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest)
  }
  fs.writeFileSync(htmlFileName, html)
}
