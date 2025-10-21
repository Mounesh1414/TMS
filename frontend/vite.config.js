import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Don't generate source maps for production
    minify: 'esbuild', // Use esbuild instead of terser (faster and built-in)
  }
})
