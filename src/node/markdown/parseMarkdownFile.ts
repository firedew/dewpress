import fs from 'fs-extra'
import { join, resolve } from 'path'
import renderMarkdown from './renderMarkdown'
import createHtml from '../createHtml'
import { DewSiteConfig } from '../types'

export default async function parseMarkdownFile(page: string, config: DewSiteConfig): Promise<string> {
  const fileContent = await fs.readFile(resolve(join(config.srcDir!, page)), { encoding: 'utf-8' })
  const { content, data } = renderMarkdown(fileContent)

  return createHtml(content, { config, page, data })
}
