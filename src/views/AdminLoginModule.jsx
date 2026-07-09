import { useState } from 'react';
import styles from './AdminLoginModule.module.css';

function AdminLoginModule({ onLogin, error, loading }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onLogin({ correo, password });
  };

  return (
    <div className={styles.loginPage}>
      <section className={styles.loginCard}>
        <div className={styles.brandSide}>
          <div className={styles.brandBadge}>
            <span className={styles.brandMark}>Una Sola Tacarigua</span>
            <span className={styles.brandTag}>Panel Admin</span>
          </div>

          <div className={styles.brandLogo} aria-label="Logo Una Sola Tacarigua" role="img" />

          <div className={styles.brandCopy}>
            <h2>La identidad cultural de Tacarigua, en un solo lugar.</h2>
          </div>
        </div>

        <div className={styles.formSide}>
          <div className={styles.headline}>
            <p className={styles.kicker}>Acceso administrativo</p>
            <h1>Iniciar Sesión</h1>
          </div>

          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <label htmlFor="admin-email">Correo institucional</label>
              <input
                id="admin-email"
                value={correo}
                onChange={(event) => setCorreo(event.target.value)}
                type="email"
                placeholder="carlos@tacarigua.org"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="admin-password">Contraseña secreta</label>
              <input
                id="admin-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="●●●●●●●●"
                required
              />
            </div>

            {error && <div className={styles.loginError}>{error}</div>}

            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Validando credenciales...' : 'Ingresar al panel'}
            </button>
          </form>

          <footer className={styles.adminFooter}>
            <p>Panel de Administración &copy; {new Date().getFullYear()} <span>Una Sola Tacarigua</span></p>
          </footer>
        </div>
      </section>
    </div>
  );
}

export default AdminLoginModule;