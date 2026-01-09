import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
    port: 5173, 
    open: true,
    proxy: {    // ← AJOUTEZ ce proxy
      '/api': {
        target: 'http://localhost:5000', //mon backend express
        changeOrigin: true,
        secure: false,
      }
    }
  },
});