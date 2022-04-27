import { DewUserConfig } from './types'
import { globby } from 'globby'

export async function getPages (config: DewUserConfig) {
  return (
    await globby(['**.md'], {
      cwd: config.srcDir,
    })
  ).sort()
}
