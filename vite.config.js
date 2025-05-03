import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteCompression from 'vite-plugin-compression' // Добавьте этот импорт

export default defineConfig({
  plugins: [
    vue(),
    // Добавьте эти плагины для сжатия
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz'
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br'
    })
  ],
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
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    // Добавьте эту секцию для production-оптимизаций
    target: 'esnext',
    minify: 'terser',
    reportCompressedSize: true, // Показывать размеры сжатых файлов
    chunkSizeWarningLimit: 1000, // Лимит предупреждений о размере чанка
    cssCodeSplit: true // Разделение CSS
  }
})