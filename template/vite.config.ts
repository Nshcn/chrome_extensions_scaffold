import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './src/manifest';

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
  build: {
    // 防止 CSS 代码分割
    cssCodeSplit: false,
    // 防止代码分割
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}); 