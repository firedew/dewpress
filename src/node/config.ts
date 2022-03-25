import path from 'path'
import fs from 'fs-extra'
import {
  normalizePath,
  UserConfig as ViteConfig,
  mergeConfig as mergeViteConfig,
  loadConfigFromFile
} from 'vite'
import log from './utils/log'

export interface UserConfig extends ViteConfig {
  srcDir: string
  outDir: string
}

export interface SiteConfig {
  root: string
  srcDir: string
  outDir: string
}

const resolve = (root: string, file: string) =>
  normalizePath(path.resolve(root, `.dewpress`, file))

const supportedConfigExtensions = ['js', 'ts', 'mjs', 'mts']

async function resolveUserConfig(
  root: string,
  command: 'serve' | 'build',
  mode: string
): Promise<[UserConfig, string | undefined]> {
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
): Promise<SiteConfig> {
  const [userConfig] = await resolveUserConfig(root, command, mode);
  const srcDir = path.resolve(root, userConfig.srcDir || '.')
  const outDir = userConfig.outDir
    ? path.resolve(root, userConfig.outDir)
    : resolve(root, 'dist')

  return {
    root,
    srcDir,
    outDir
  }
}


async function resolveConfigExtends(
  config: any

): Promise<UserConfig> {
  const resolved = await (typeof config === 'function' ? config() : config)
  if (resolved.extends) {
    const base = await resolveConfigExtends(resolved.extends)
    return mergeConfig(base, resolved) as UserConfig
  }
  return resolved
}

function mergeConfig(a: UserConfig, b: UserConfig, isRoot = true) {
  const merged: Record<string, any> = { ...a }
  for (const key in b) {
    const value = b[key as keyof UserConfig]
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
        merged[key] = mergeConfig(existing as UserConfig, value as UserConfig, false)
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
