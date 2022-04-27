import { PreviewOptions } from 'vite'

export interface DewPreviewOptions extends PreviewOptions {
  skipOpen?: boolean
}

export interface DewHeadOptions {
  /**
   * Website raw head content. This value will be added to as is in the <head> on each generated page.
   * @default empty
   */
  raw?: string
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
  /**
   * Website head options. Will be added to <head> on each generated page.
   * @default empty
   */
  head?: DewHeadOptions
}

export declare interface DewSiteConfig extends DewUserConfig {
  configPath?: string
}
