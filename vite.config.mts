import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig } from 'vite'

export default defineConfig((env: ConfigEnv): UserConfig => {
  return {
    envDir: 'env',
    build: {
      minify: false,
      sourcemap: env.mode !== 'production',
      rollupOptions: {
        preserveEntrySignatures: 'strict',
        input: './src/extension.ts',
        external: ['vscode', 'util'],
        output: [
          {
            dir: 'out',
            format: 'cjs',
            entryFileNames: '[name].js',
          },
        ],
      },
    },
  }
})
