import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'markdown': ['react-markdown', 'rehype-highlight', 'highlight.js'],
        },
      },
    },
  },
  server: {
    proxy: {
      '/api/auth': {
        target: 'https://ngw.devices.sberbank.ru:9443',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth/, '/api/v2/oauth'),
        secure: false,
      },
      '/api/gigachat': {
        target: 'https://gigachat.devices.sberbank.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gigachat/, '/api/v1'),
        secure: false,
      },
    },
  },
})
