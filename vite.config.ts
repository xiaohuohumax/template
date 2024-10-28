import vue from '@vitejs/plugin-vue'
import bookmarklet from '@xiaohuohumax/vite-plugin-bookmarklet'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), bookmarklet()],
})
