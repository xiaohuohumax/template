import fs from 'node:fs'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import monkey, { cdn } from 'vite-plugin-monkey'

function svgToBase64(filePath: string) {
  const data = fs.readFileSync(filePath)
  return `data:image/svg+xml;base64,${data.toString('base64')}`
}

export default defineConfig({
  envDir: './env',
  plugins: [
    vue(),
    monkey({
      entry: './src/index.ts',
      userscript: {
        icon64: svgToBase64('./logo.svg'),
        include: ['*'],
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
})
