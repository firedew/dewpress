import { defineConfig } from 'rollup'
import { resolve } from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import copy from 'rollup-plugin-copy'

const resolveFromRoot = (path) => resolve(__dirname, '../', path)
const pkg = require('../package.json')

export default defineConfig({
  input: [resolveFromRoot('src/node/cli.ts')],
  output: {
    format: 'cjs',
    dir: resolveFromRoot('dist/node')
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    esbuild({
      target: 'node12'
    }),
    json(),
    copy({
      targets: [
        { src: 'src/node/templates/**/*', dest: 'dist/node/templates' },
      ]
    })
  ],
  external: [...Object.keys(pkg.dependencies), 'node:fs', 'node:path', 'node:process', 'node:url', 'node:stream'],
  onwarn(warning, warn) {
    if (warning.code !== 'EVAL') warn(warning)
  }
})
