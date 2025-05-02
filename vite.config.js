import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~styles': path.resolve(__dirname, './src/styles')
    }
  }
})