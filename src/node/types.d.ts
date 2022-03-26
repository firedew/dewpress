import { PreviewOptions } from 'vite'

export interface DewPreviewOptions extends PreviewOptions {
  skipOpen?: boolean
}

export declare interface DewUserConfig {
  /**
   * Website language  <html lang="...">
   * @default en
   */
  lang?: string
  /**
   * Website title, will be prefixed for each site title
   * @default en
   */
  title?: string
  /**
   * Website description
   * @default en
   */
  description?: string
  /**
   * Website source directory. Can be an absolute path, or a path relative from
   * the location of the config file itself.
   * @default src
   */
  srcDir?: string
  /**
   * Website target directory. Path relative to the source directory.
   * @default .dewpress/dist
   */
  outDir?: string
}
