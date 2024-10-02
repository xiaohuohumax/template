import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const entries = {
  index: './src/index.ts',
}

export default defineConfig([
  {
    input: entries,
    output: {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].mjs',
    },
    plugins: [esbuild()],
  },
  {
    input: entries,
    output: {
      dir: 'dist',
      format: 'cjs',
      exports: 'named',
      entryFileNames: '[name].cjs',
    },
    plugins: [esbuild()],
  },
  {
    input: entries,
    output: {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].d.ts',
    },
    plugins: [dts()],
  },
])
