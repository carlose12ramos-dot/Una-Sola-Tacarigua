import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminApp from '../views/AdminApp';
import '../styles/variables.css';
import '../index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminApp />
  </React.StrictMode>,
);
