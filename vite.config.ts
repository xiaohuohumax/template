import type { InputOption } from 'rollup'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import simpleHtmlPlugin from 'vite-plugin-simple-html'

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, 'env')

  const input: InputOption = {
    index: './index.html',
  }

  if (env.VITE_CONFIG_BUNDLED_SEPARATELY !== 'false') {
    input.appConfig = './src/app.config.ts'
  }

  return {
    envDir: './env',
    base: env.VITE_BASE_URL,
    plugins: [
      simpleHtmlPlugin ({
        inject: {
          data: {
            title: env.VITE_APP_NAME,
          },
        },
      }),
      vue(),
      UnoCSS(),
      viteMockServe({
        mockPath: 'mock',
        enable: command === 'serve',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~': path.resolve(__dirname, './src/components'),
      },
    },
    build: {
      rollupOptions: {
        input,
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          entryFileNames({ name, isEntry }) {
            if (isEntry && name === 'appConfig') {
              return 'app.config-[hash].js'
            }
            return 'assets/js/[name]-[hash].js'
          },
        },
      },
    },
  }
})
