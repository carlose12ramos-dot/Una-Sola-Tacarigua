import { useState } from 'react';
import AdminDashboardModule from './AdminDashboardModule';
import AdminLoginModule from './AdminLoginModule';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function postToApi(path, body) {
  const endpoint = `${API_BASE}${path}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response;
}

function AdminApp() {
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('tacariguaAdmin');
    if (!saved) return null;
    try { return JSON.parse(saved); }
    catch { localStorage.removeItem('tacariguaAdmin'); return null; }
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({ correo, password }) => {
    setError('');
    setLoading(true);

    try {
      const response = await postToApi('/auth/login', { correo, password });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'No se pudo iniciar sesión.');
        return;
      }

      const { user, token } = data;
      const adminData = { ...user, token };
      localStorage.setItem('tacariguaAdmin', JSON.stringify(adminData));
      setAdminUser(adminData);
    } catch {
      setError(`Error de conexión con el servidor. Verifica que el backend esté ejecutándose en ${API_BASE}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tacariguaAdmin');
    setAdminUser(null);
    setError('');
  };

  return adminUser ? (
    <AdminDashboardModule adminUser={adminUser} onLogout={handleLogout} />
  ) : (
    <AdminLoginModule onLogin={handleLogin} error={error} loading={loading} />
  );
}

export default AdminApp;
