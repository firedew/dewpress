import MarkdownIt from 'markdown-it'
import markdownItAttrs from 'markdown-it-attrs'
import markdownItContainer from 'markdown-it-container'
import matter from 'gray-matter'
import Token from 'markdown-it/lib/token'
import { renderTagAttributes } from './renderUtils'


const md = MarkdownIt({
  html: true,
  linkify: true,
});

md.use(markdownItAttrs);
md.use(markdownItContainer, 'div', {
  render: (tokens: Token[], idx: number) => {
    const token = tokens[idx];
    return token.nesting === 1 ? `<div${renderTagAttributes(token.info)}>\n` : `</div>\n`;
  }
})

md.renderer.rules.heading_open = (tokens, idx) => {
  const token = tokens[idx]
  const level = token.tag.slice(1);
  return `<${token.tag} class="is-size-${level}">`
}

export default function renderMarkdown (fileContent: string)  {
  const processedContent = matter(fileContent)
  const content = md.render(processedContent.content)

  return {
    content,
    data: processedContent.data,
  }
}
