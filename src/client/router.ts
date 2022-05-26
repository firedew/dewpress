export interface PageData {
  relativePath: string
  title: string
  description: string
  headers: any[]
  frontmatter: Record<string, any>
  lastUpdated?: number
}

export interface Route {
  path: string
  data: PageData
}

export interface Router {
  route: Route
  go: (href?: string) => Promise<void>
}

// we are just using URL to parse the pathname and hash - the base doesn't
// matter and is only passed to support same-host hrefs.
// const fakeHost = `http://a.com`


export function createRouter(loadPageModule: (path: string) => Promise<any>) {
  loadPageModule(location.href)
    .then((module) => {
      console.log(module.default.data)
      document.body.innerHTML = module.default.content;
    })
}

/**
 * Converts a url path to the corresponding js chunk filename.
 */
export function pathToFile(path: string): string {
  let pagePath = path.replace(/\.html$/, '')
  pagePath = decodeURIComponent(pagePath)
  if (pagePath.endsWith('/')) {
    pagePath += 'index'
  }

  pagePath += `.md?import&t=${Date.now()}`
  return pagePath
}
