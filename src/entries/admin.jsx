import React from 'react'
import ReactDOM from 'react-dom/client'
import AdminDashboardModule from '../views/AdminDashboardModule'
import '../index.css'
import '../styles/variables.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <AdminDashboardModule />
      <a 
        href="/" 
        style={{ 
          position: 'fixed', 
          bottom: '15px', 
          right: '15px', 
          padding: '12px 18px', 
          background: 'var(--goldenrod)', 
          color: 'black', 
          zIndex: 1000, 
          borderRadius: '30px', 
          border: 'none', 
          cursor: 'pointer', 
          textDecoration: 'none', 
          fontSize: '14px', 
          fontWeight: '600',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'transform 0.2s ease, background-color 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        Ver Vista Pública
      </a>
    </>
  </React.StrictMode>,
)
