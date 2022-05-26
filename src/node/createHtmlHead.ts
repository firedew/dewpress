import { DewHeadLink, DewSiteConfig } from './types'

export default function (config: DewSiteConfig, data: any = {}) {
  return `<meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${[data.title, config.title].filter(t => !!t).join(' | ')}</title>
  <meta name="description" content="${data.description || config.description}">${getLinkTags(config.head?.links!)}
`
}

function getLinkTags (links?: DewHeadLink[]) {
  if (!links || links.length === 0) {
    return ''
  }

  return `
  ${links.map(link => `<link ${getLinkTagAttrs(link)}>`).join('\n')}`
}

function getLinkTagAttrs (link: DewHeadLink) {
  return Object.keys(link).map((key) => link[key] === true ? key : `${key}="${link[key]}"`).join(' ');
}
