import { DewUserConfig } from './types'
import { globby } from 'globby'
import fs from 'fs-extra'
import path from 'path'

export async function copyAssets (config: DewUserConfig) {
  const assets = (
    await globby(['public/**/*'], {
      cwd: config.srcDir,
    })
  )

  assets.forEach((file) => {
    fs.copy(path.join(config.srcDir!, file), file.replace(/^public\//, `${config.outDir}/`))
  })
}
