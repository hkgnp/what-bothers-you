import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Target backend server
        changeOrigin: true, // Recommended for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite the API request
      },
    },
  },
})
