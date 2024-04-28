import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Neutec/' : '/',
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [
        resolve(process.cwd(), 'src/assets/img/icon'),
      ],
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        manualChunks(id) {
          if (id.includes('node_modules') && id.includes('@vue')) {
            return '@vue';
          }

          if (id.includes('node_modules')) {
            const moduleName = id.toString().split('node_modules/')[1].split('/')[0].toString();

            // node_modules 分 chunks
            return moduleName;
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
