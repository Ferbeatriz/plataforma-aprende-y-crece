import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  // Forzar el uso de esbuild en lugar de rolldown
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      external: [],
    },
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.cjs'],
      strictRequires: true,
    },
    // Forzar que use esbuild como empaquetador
    minify: 'esbuild',
  },
  // Usar esbuild en lugar de rolldown para el servidor de desarrollo
  server: {
    force: true,
  },
})