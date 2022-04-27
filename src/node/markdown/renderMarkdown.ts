import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'

const md = MarkdownIt({
  html: true,
  linkify: true,
})

export default function renderMarkdown (fileContent: string)  {
  const processedContent = matter(fileContent)
  const content = md.render(processedContent.content)

  return {
    content,
    data: processedContent.data,
  }
}
