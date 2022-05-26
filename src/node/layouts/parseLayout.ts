import { DewSiteConfig } from '../types'
import fs from 'fs-extra'
import { join, resolve } from 'path'

export default async function (content: string, { data, config }: { data: any, config: DewSiteConfig }) {
  if (!data.layout) {
    return content
  }

  // TODO: enable caching here
  const layout = await fs.readFile(resolve(join(config.srcDir!, 'layouts', `${data.layout}.html`)), { encoding: 'utf-8' })
  return layout.replace('${content}', content)
}
