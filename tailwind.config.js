import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import viteCompression from 'vite-plugin-compression'

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#161616',
          secondary: '#191919',
          text: '#ffffff'
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        }
      }
    }
  },
  css: {
    postcss: './postcss.config.cjs' // Явно указываем путь
  },
  plugins: [
    vue(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Сжимать файлы > 10KB
      deleteOriginFile: false // Не удалять оригинальные файлы
    }),
    // Brotli-сжатие (опционально)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240
    })
  ],
  build: {
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true, 
        drop_debugger: true 
      }
    }
  },
  darkMode: 'class',
  // Оптимизации для production
  corePlugins: {
    float: false,    // Отключаем неиспользуемые плагины
    clear: false,
    skew: false
  },
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    options: {
      safelist: [
        'dark',      // Сохраняем классы для dark mode
        /dark-mode:/, 
        /bg-dark-/,
        /text-dark-/,
        /border-dark-/
      ],
      keyframes: true,
      fontFace: true
    }
  }
}