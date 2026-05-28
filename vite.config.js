import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        historia: resolve(__dirname, 'historia.html'),
        cultura: resolve(__dirname, 'cultura.html'),
        biblioteca: resolve(__dirname, 'biblioteca.html'),
        geografia: resolve(__dirname, 'geografia.html'),
        sanidad: resolve(__dirname, 'sanidad.html'),
        deportes: resolve(__dirname, 'deportes.html'),
        sociedad: resolve(__dirname, 'sociedad.html'),
        nosotros: resolve(__dirname, 'nosotros.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
    },
  },
})