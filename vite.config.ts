import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        accessibility: fileURLToPath(
          new URL('./accessibility/index.html', import.meta.url),
        ),
        privacy: fileURLToPath(new URL('./privacy/index.html', import.meta.url)),
        comparison: fileURLToPath(
          new URL('./comparison/index.html', import.meta.url),
        ),
        beta: fileURLToPath(new URL('./beta/index.html', import.meta.url)),
      },
    },
  },
})
