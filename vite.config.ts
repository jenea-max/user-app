import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 3000, 
    open: true, // Автооткрытие браузера
  },
  resolve: {
    alias: {
      '@': '/src', // Абсолютные импорты через `@/components/...`
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Увеличивает лимит для предупреждений
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Сегментировать библиотеки в отдельный чанк
          }
        },
      },
    },
  },
})
