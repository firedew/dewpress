import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'

const md = MarkdownIt({
  html: true,
  linkify: true,
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
