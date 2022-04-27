import path from 'path'
import fs from 'fs-extra'
import {
  normalizePath,
  mergeConfig as mergeViteConfig,
  loadConfigFromFile
} from 'vite'
import log from '../utils/log'
import { DewSiteConfig, DewUserConfig } from '../types'
import { defaultDewConfig } from './defaults'

const resolve = (root: string, file: string) =>
  normalizePath(path.resolve(root, `.dewpress`, file))

const supportedConfigExtensions = ['js', 'ts', 'mjs', 'mts']

async function resolveUserConfig(
  root: string,
  command: 'serve' | 'build',
  mode: string
): Promise<[DewUserConfig, string | undefined]> {
  // load user config
  let configPath
  for (const ext of supportedConfigExtensions) {
    const p = resolve(root, `config.${ext}`)
    if (await fs.pathExists(p)) {
      configPath = p
      break
    }
  }

  const userConfig = configPath
    ? ((
      await loadConfigFromFile(
        {
          command,
          mode
        },
        configPath,
        root
      )
    )?.config as any)
    : {}

  if (configPath) {
    log.warning(`loaded config at ${configPath}`)
  } else {
    log.warning(`no config file found.`)
  }

  return [await resolveConfigExtends(userConfig), configPath]
}

export async function resolveConfig(
  root: string = process.cwd(),
  command: 'serve' | 'build' = 'serve',
  mode = 'development'
): Promise<DewSiteConfig> {
  const [userConfig, configPath] = await resolveUserConfig(root, command, mode);
  userConfig.srcDir = path.resolve(root, userConfig.srcDir || '.')
  userConfig.outDir = userConfig.outDir
    ? path.resolve(root, userConfig.outDir)
    : resolve(root, 'dist')

  return {
    ...defaultDewConfig,
    ...userConfig,
    configPath,
  }
}


async function resolveConfigExtends(
  config: any

): Promise<DewUserConfig> {
  const resolved = await (typeof config === 'function' ? config() : config)
  if (resolved.extends) {
    const base = await resolveConfigExtends(resolved.extends)
    return mergeConfig(base, resolved) as DewUserConfig
  }
  return resolved
}

function mergeConfig(a: DewUserConfig, b: DewUserConfig, isRoot = true) {
  const merged: Record<string, any> = { ...a }
  for (const key in b) {
    const value = b[key as keyof DewUserConfig]
    if (value == null) {
      continue
    }
    const existing = merged[key]
    if (Array.isArray(existing) && Array.isArray(value)) {
      merged[key] = [...existing, ...value]
      continue
    }
    if (isObject(existing) && isObject(value)) {
      if (isRoot && key === 'vite') {
        merged[key] = mergeViteConfig(existing, value)
      } else {
        merged[key] = mergeConfig(existing as DewUserConfig, value as DewUserConfig, false)
      }
      continue
    }
    merged[key] = value
  }
  return merged
}

function isObject(value: unknown): value is Record<string, any> {
  return Object.prototype.toString.call(value) === '[object Object]'
}
