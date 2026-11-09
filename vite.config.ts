import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    watch: { usePolling: !!process.env.CHOKIDAR_USEPOLLING },
  },
  build: { sourcemap: true },
  test: { environment: 'jsdom', passWithNoTests: true },
})
