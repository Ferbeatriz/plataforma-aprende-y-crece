import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  // Forzar el uso de esbuild como empaquetador
  build: {
    rollupOptions: {
      external: [],
    },
    // Asegurar que use esbuild en lugar de rolldown
    minify: 'esbuild',
  },
  // Configurar esbuild para optimizaciones
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
})