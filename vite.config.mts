import path from 'path';
import { ConfigEnv, UserConfig, defineConfig } from 'vite';

export default defineConfig((env: ConfigEnv): UserConfig => {
  return {
    envDir: 'env',
    resolve: {
      alias: {
        '#': path.resolve(__dirname, ''),
        '@': path.resolve(__dirname, './src')
      }
    },
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
            entryFileNames: '[name].js'
          }
        ]
      }
    }
  };
});