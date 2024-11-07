import fs from 'node:fs'
import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

function svgToBase64(filePath: string) {
  const data = fs.readFileSync(filePath)
  return `data:image/svg+xml;base64,${data.toString('base64')}`
}

export default defineConfig({
  envDir: './env',
  plugins: [
    monkey({
      entry: './src/index.ts',
      userscript: {
        icon64: svgToBase64('./logo.svg'),
        include: ['*'],
      },
    }),
  ],
})
