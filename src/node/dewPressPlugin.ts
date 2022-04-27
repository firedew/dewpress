import { Plugin } from 'vite'
import { DewSiteConfig } from './types'
import parseMarkdownFile from './markdown/parseMarkdownFile'
import fs from 'fs-extra'
import path from 'path'

export default function dewPressPlugin(
  root: string,
  config: DewSiteConfig,
): Plugin {

  return {
    name: 'dewpress',

    async transform(code, id) {
      if (id.endsWith('.md')) {
        console.log('Should transform', id)
      }

      return Promise.resolve(code)
    },
    configureServer(server) {
      if (config.configPath) {
        server.watcher.add(config.configPath)
      }

      // serve our index.html after vite history fallback
      return () => {
        const CLIENT_PATH = path.resolve(__dirname, '../client')
        server.middlewares.use(async (req, res, next) => {
          console.log('server request', req.originalUrl)
          // Check if the request is a page
          const page = `${req.originalUrl}/index.md`;
          const isPage = fs.existsSync(`${config.srcDir}/${page}`)
          if (req.url!.endsWith('.html') || isPage) {
            server.watcher.add(page)
            const html = await parseMarkdownFile(page, config, true, `<script type="module" src="/@fs/${CLIENT_PATH}/index.js"></script>`)
            res.statusCode = 200
            res.end(html)
//             res.end(`
// <!DOCTYPE html>
// <html>
//   <head>
//     <title></title>
//     <meta charset="utf-8">
//     <meta name="viewport" content="width=device-width,initial-scale=1">
//     <meta name="description" content="">
//   </head>
//   <body>
//     <div id="app"></div>
//     <h1>Hi, I am a default page served through Vite ${root}${req.url}</h1>
//     <script type="module" src="/@fs/${APP_PATH}/index.js"></script>
//   </body>
// </html>`)
            return
          }
          next()
        })
      }
    },
    async handleHotUpdate(ctx) {
      // handle config hmr
      const { file, read, server } = ctx
      if (file === config.configPath) {
        console.log('config changed')
        // const newData = await resolveSiteData(root)
        // if (newData.base !== siteData.base) {
        //   console.warn(
        //     `[vitepress]: config.base has changed. Please restart the dev server.`
        //   )
        // }
        // siteData = newData
        // return [server.moduleGraph.getModuleById(SITE_DATA_REQUEST_PATH)!]
        server.ws.send({
          type: 'custom',
          event: 'vitepress:pageData',
          data: {
            path: `/${slash(path.relative(config.srcDir!, file))}`,
            // pageData
          }
        })
      }

      // hot reload .md files as .vue files
      if (file.endsWith('.md')) {
        console.log('markdown changed')
        // const content = await read()
        // const { pageData, vueSrc } = await markdownToVue(
        //   content,
        //   file,
        //   config.publicDir
        // )

        // notify the client to update page data
        // TODO: figure out how to set the client to reload on change
        server.ws.send({
          type: 'custom',
          event: 'dewpress:pageData',
          data: {
            path: `/${slash(path.relative(config.srcDir!, file))}`,
            // pageData
          }
        })
        //
        // // overwrite src so vue plugin can handle the HMR
        // ctx.read = () => vueSrc
      }
    }
  }
}

function slash(p: string): string {
  return p.replace(/\\/g, '/')
}
