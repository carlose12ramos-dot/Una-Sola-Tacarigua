import { ArrowLeft, BookOpen, Check, Clock, Users } from 'lucide-react';
import styles from './AdminDashboardModule.module.css';
import { adminMetricsMock, adminModerationMock } from '../data/mockData';

const NAV_ITEMS = [
  'Inicio', 'Geografía', 'Historia', 'Cultura', 'Biblioteca', 'Usuarios', 'Moderación',
];

const METRICS = [
  { key: 'usuariosActivos', label: 'Usuarios Activos', icon: Users },
  { key: 'cultoresValidados', label: 'Cultores Validados', icon: Check },
  { key: 'sugerenciasPendientes', label: 'Sugerencias Pendientes', icon: Clock },
  { key: 'elementosBiblioteca', label: 'Elementos Biblioteca', icon: BookOpen },
];

function getStatusClass(estado) {
  if (estado === 'Aprobado') return styles.statusAprobado;
  if (estado === 'Rechazado') return styles.statusRechazado;
  return styles.statusPendiente;
}

function AdminDashboardModule({ adminUser, onLogout }) {
  const pendingCount = adminModerationMock.filter((r) => r.estado === 'Pendiente').length;

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <div className={styles.brandRow}>
            <div className={styles.brandIcon}>T</div>
            <div>
              <div className={styles.brandName}>Una Sola Tacarigua</div>
              <div className={styles.brandSub}>Panel Admin</div>
            </div>
          </div>
        </div>

        <ul className={styles.navMenu}>
          {NAV_ITEMS.map((item) => (
            <li
              key={item}
              className={item === 'Moderación' ? styles.navItemActive : styles.navItem}
            >
              {item}
            </li>
          ))}
        </ul>

        <div className={styles.sidebarFooter}>
          <a href="/" className={styles.backLink}>
            <ArrowLeft size={16} />
            Ver sitio público
          </a>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>Panel de Administración</h1>
            <p className={styles.welcomeText}>Bienvenido, {adminUser?.nombre || 'Administrador'}</p>
          </div>

          <div className={styles.userProfile}>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{adminUser?.nombre || 'Carlos Eduardo Ramos González'}</div>
              <div className={styles.userRole}>{adminUser?.rol === 'admin' ? 'SuperAdmin' : adminUser?.rol}</div>
            </div>
            <div className={styles.userAvatar} aria-hidden="true">
              {adminUser?.nombre ? adminUser.nombre.split(' ').map((word) => word[0]).join('').slice(0, 2) : 'CR'}
            </div>
            <button type="button" className={styles.logoutBtn} onClick={onLogout}>
              Cerrar sesión
            </button>
          </div>
        </header>

        <div className={styles.dashboard}>
          <div className={styles.dashboardHeader}>
            <h2 className={styles.sectionTitle}>Dashboard</h2>
            <div className={styles.statusPill}>
              <span className={styles.statusDot} />
              {pendingCount} sugerencias pendientes
            </div>
          </div>

          <div className={styles.metricsGrid}>
            {METRICS.map(({ key, label, icon: Icon }) => (
              <div key={key} className={styles.metricCard}>
                <div className={styles.metricIcon}>
                  <Icon size={20} />
                </div>
                <div className={styles.metricTitle}>{label}</div>
                <div className={styles.metricValue}>{adminMetricsMock[key]}</div>
              </div>
            ))}
          </div>

          <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
              <h3 className={styles.tableTitle}>Bandeja de Moderación</h3>
              <span className={styles.tableCount}>{adminModerationMock.length} registros</span>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Tipo</th>
                  <th>Detalles</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {adminModerationMock.map((row) => (
                  <tr key={row.id} className={styles.tableRow}>
                    <td>
                      <div className={styles.userCell}>
                        <img src={row.imagen} alt="" className={styles.tableAvatar} />
                        <span>{row.usuario}</span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.tipoBadge}>{row.tipo}</span>
                    </td>
                    <td>{row.detalles}</td>
                    <td>
                      <span className={getStatusClass(row.estado)}>{row.estado}</span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        {row.estado === 'Pendiente' ? (
                          <>
                            <button type="button" className={styles.approveBtn}>Validar</button>
                            <button type="button" className={styles.rejectBtn}>Rechazar</button>
                          </>
                        ) : (
                          <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboardModule;
