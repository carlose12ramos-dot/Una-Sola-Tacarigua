import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

function noCacheMiddleware() {
  return (_req, _res, next) => {
    _res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
    _res.setHeader('Pragma', 'no-cache')
    _res.setHeader('Expires', '0')
    next()
  }
}

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [],
      },
    }),
    {
      name: 'no-cache-middleware',
      configureServer(server) {
        server.middlewares.use(noCacheMiddleware())
      },
    },
  ],
  server: {
    port: 3000,
    host: true,
    open: true,
    watch: {
      ignored: ['**/public/**/*.pdf', '**/public/**/*.PDF'],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
    hmr: {
      overlay: true,
    },
  },
  preview: {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        historia: resolve(__dirname, 'historia.html'),
        cultura: resolve(__dirname, 'cultura.html'),
        biblioteca: resolve(__dirname, 'biblioteca.html'),
        geografia: resolve(__dirname, 'geografia.html'),
        sociedad: resolve(__dirname, 'sociedad.html'),
        nosotros: resolve(__dirname, 'nosotros.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
    },
  },
})
