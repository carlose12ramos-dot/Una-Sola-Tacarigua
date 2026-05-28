import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './AppLayout.module.css';

const AppLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.mainContent}>
        {children}
      </main>
      <Footer />
      <a 
        href="/admin.html" 
        style={{ 
          position: 'fixed', 
          bottom: '15px', 
          right: '15px', 
          padding: '12px 18px', 
          background: 'var(--oxford-navy)', 
          color: 'white', 
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
        Ver Vista Admin
      </a>
    </div>
  );
};

export default AppLayout;
