import { UserConfig } from 'vite'

const defaultUserConfig: UserConfig = {
  root: 'src',
  build: {
    outDir: '.dewpress/dist'
  },
  preview: {
    port: 3000,
    open: true,
  }
}

export default defaultUserConfig
