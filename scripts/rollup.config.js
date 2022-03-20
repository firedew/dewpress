import { defineConfig } from 'rollup'
import { resolve } from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const resolveFromRoot = (path) => resolve(__dirname, '../', path)

export default defineConfig({
  input: [resolveFromRoot('src/node/cli.ts')],
  output: {
    format: 'cjs',
    dir: resolveFromRoot('dist/node')
  },
  plugins: [
    commonjs(),
    nodeResolve()
  ]
})
