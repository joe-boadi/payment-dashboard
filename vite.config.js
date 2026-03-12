import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/sales-api': {
        target: 'https://spes.pscgh.com:442',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})