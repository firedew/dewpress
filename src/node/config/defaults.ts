import { UserConfig } from 'vite'
import { DewUserConfig } from '../types'

const defaultDewConfig: DewUserConfig = {
  lang: 'en',
  srcDir: 'src',
  outDir: '.dewpress/dist',
  title: 'DewPress',
  description: 'My awesome DewPress website',
}

const defaultViteConfig: UserConfig = {
  preview: {
    port: 3000,
    open: true,
  }
}

export {
  defaultViteConfig,
  defaultDewConfig,
}
