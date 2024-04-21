import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { InputOption } from 'rollup';
import UnoCSS from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'env');

  const input: InputOption = {
    'index': './index.html'
  };
  if (env.VITE_IS_EXTRACT_APP_CONFIG === 'true') {
    input['appConfig'] = './src/appConfig.ts';
  }

  return {
    envDir: 'env',
    plugins: [
      vue(),
      UnoCSS(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '#': path.resolve(__dirname, '')
      }
    },
    build: {
      rollupOptions: {
        input,
        output: {
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          entryFileNames({ name, isEntry }) {
            if (isEntry && name === 'appConfig') {
              return 'appConfig-[hash].js';
            }
            return 'assets/[name]-[hash].js';
          }
        }
      }
    }
  };
});
