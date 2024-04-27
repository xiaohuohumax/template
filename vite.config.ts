import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  build: {
    rollupOptions: {
      input: 'src/index.ts',
      // preserveEntrySignatures: 'strict',
      external: ['path'],
      output: {
        dir: 'dist',
        format: 'esm',
        // preserveModules: true,
        entryFileNames: '[name].mjs',
      }
    }
  }
})