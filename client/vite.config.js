import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      components: '/src/components',
      pages: '/src/pages',
      utils: '/src/utils',
      hooks: '/src/hooks',
    },
  },
  
  build: {
    outDir: 'build',
  },
  
  server: {
    port: 3000,
    open: true,
  },
});