import { DewSiteConfig } from '../types'
import fs from 'fs-extra'
import { join, resolve } from 'path'
import renderMarkdown from '../markdown/renderMarkdown'

export default async function (content: string, { data, config }: { data: any, config: DewSiteConfig }) {
  if (!data.layout) {
    return content
  }

  // TODO: enable caching here
  let layout = await fs.readFile(resolve(join(config.srcDir!, 'layouts', `${data.layout}.html`)), { encoding: 'utf-8' })
  layout = await renderPartials(layout, config);
  return layout.replace('${content}', content)
}

async function renderPartials (layout: string, config: DewSiteConfig) {
  const partials = layout.match(/\${partial:.+}/g) || [];

  await Promise.all(partials.map(async (partial) => {
    const name = partial.substring(10, partial.length -1);
    console.log('partial', name)
    const partialContent = await fs.readFile(resolve(join(config.srcDir!, 'partials', `${name}.md`)), { encoding: 'utf-8' })
    layout = layout.replace(partial, renderMarkdown(partialContent).content);
  }))

  console.log(partials)
  return layout;
}
