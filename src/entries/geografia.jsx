import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import GeografiaModule from '../views/GeografiaModule'
import '../index.css'
import '../styles/variables.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppLayout>
        <GeografiaModule />
      </AppLayout>
    </BrowserRouter>
  </React.StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    const registrations = await navigator.serviceWorker.getRegistrations();
    registrations.forEach((registration) => registration.unregister());
    console.log('Service Worker desregistrado para evitar caché antigua.');
  });
}
