import bookmarklet from '@xiaohuohumax/vite-plugin-bookmarklet'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    bookmarklet({
      entry: 'src/main.ts',
    }),
  ],
})
