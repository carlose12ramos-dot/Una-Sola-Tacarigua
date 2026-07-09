import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import AppLayout from '../components/layout/AppLayout'
import NosotrosModule from '../views/NosotrosModule'
import '../index.css'
import '../styles/variables.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AppLayout>
          <NosotrosModule />
        </AppLayout>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
