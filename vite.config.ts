import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['backlog'],
    watch: { usePolling: !!process.env.CHOKIDAR_USEPOLLING },
  },
  preview: { allowedHosts: ['preview'] },
  build: { sourcemap: true },
  test: { environment: 'jsdom', include: ['src/**/*.test.{ts,tsx}'] },
})
