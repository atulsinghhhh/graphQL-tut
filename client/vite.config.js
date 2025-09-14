import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@apollo/client'],
    force: true
  },
  server: {
    fs: {
      strict: false
    }
  }
})