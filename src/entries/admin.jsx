import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminDashboardModule from '../views/AdminDashboardModule';
import '../styles/variables.css';
import '../index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminDashboardModule />
  </React.StrictMode>,
);
