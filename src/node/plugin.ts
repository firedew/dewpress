import { Plugin } from 'vite'
import { DewSiteConfig } from './types'

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

      //TODO: create finder for markdown file and return rendered result
      const APP_PATH = 'app-path'
      // serve our index.html after vite history fallback
      return () => {
        server.middlewares.use((req, res, next) => {
          if (req.url!.endsWith('.html')) {
            res.statusCode = 200
            res.end(`
<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="description" content="">
  </head>
  <body>
    <div id="app"></div>
    <h1>Hi, I am a default page served through Vite</h1>
    <script type="module" src="/@fs/${APP_PATH}/index.js"></script>
  </body>
</html>`)
            return
          }
          next()
        })
      }
    },
  }
}
