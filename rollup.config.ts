import type { ExternalOption, InputOption, InputPluginOption } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const input: InputOption = {
  index: 'src/index.ts',
}
const plugins: InputPluginOption = [
  commonjs(),
  resolve(),
  json(),
  esbuild(),
]
const external: ExternalOption = []

const buildConfig = defineConfig({
  input,
  external,
  output: [
    {
      format: 'cjs',
      dir: 'dist',
      entryFileNames: '[name].cjs',
    },
    {
      format: 'esm',
      dir: 'dist',
      entryFileNames: '[name].mjs',
    },
  ],
  plugins,
})

const dstConfig = defineConfig({
  input,
  external,
  output: {
    format: 'esm',
    dir: 'dist',
  },
  plugins: plugins.concat(dts()),
})

export default [buildConfig, dstConfig]
