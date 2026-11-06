
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/productos': 'http://localhost:3000',
      '/pedidos': 'http://localhost:3000',
      '/reportes': 'http://localhost:3000',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    include: [
    'src/**/*.{test,spec}.{ts,tsx}',
    'tests/**/*.{test,spec}.{ts,tsx,js}',
    ],
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
  },
})

