import { PreviewOptions } from 'vite'

export default {
  source: 'src',
  dest: '.dewpress/dist',
  preview: {
    port: 3000,
    open: true,
  } as PreviewOptions
}
