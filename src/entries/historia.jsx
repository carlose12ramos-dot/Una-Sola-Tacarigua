import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import AppLayout from '../components/layout/AppLayout'
import HistoriaModule from '../views/HistoriaModule'
import '../index.css'
import '../styles/variables.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AppLayout>
          <HistoriaModule />
        </AppLayout>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    const registrations = await navigator.serviceWorker.getRegistrations();
    registrations.forEach((registration) => registration.unregister());
    console.log('Service Worker desregistrado en historia para evitar caché antigua.');
  });
}

