import React from 'react';
import styles from './AdminDashboardModule.module.css';
import { adminMetricsMock, adminModerationMock } from '../data/mockData';

const AdminDashboardModule = () => {
  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          Tacarigua <span>Digital</span>
        </div>
        <ul className={styles.navMenu}>
          <li className={styles.navItem}>Inicio</li>
          <li className={styles.navItem}>Geografía</li>
          <li className={styles.navItem}>Historia</li>
          <li className={styles.navItem}>Cultura</li>
          <li className={styles.navItem}>Biblioteca</li>
          <li className={styles.navItem}>Usuarios</li>
          <li className={`${styles.navItem} ${styles.active}`}>Moderación</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.userProfile}>
            <div className={styles.userInfo}>
              <div className={styles.userName}>Carlos Eduardo Ramos González</div>
              <div className={styles.userRole}>SuperAdmin</div>
            </div>
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop" alt="Avatar" className={styles.userAvatar} />
          </div>
        </header>

        <div className={styles.dashboard}>
          <div className={styles.dashboardHeader}>
            <h2 className={styles.title}>Dashboard</h2>
            <div className={styles.alertPill}>Amarillo Oro</div>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricTitle}>Usuarios Activos</div>
              <div className={styles.metricValue}>{adminMetricsMock.usuariosActivos}</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricTitle}>Cultores Validados</div>
              <div className={styles.metricValue}>{adminMetricsMock.cultoresValidados}</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricTitle}>Sugerencias Pendientes</div>
              <div className={styles.metricValue}>{adminMetricsMock.sugerenciasPendientes1}</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricTitle}>Sugerencias Pendientes</div>
              <div className={styles.metricValue}>{adminMetricsMock.sugerenciasPendientes2}</div>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <h3 className={styles.tableTitle}>Bandeja de Moderación de Sugerencias</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Tipo Aporte</th>
                  <th>Detalles</th>
                  <th>Estado</th>
                  <th>Acciones (Validar/Rechazar)</th>
                </tr>
              </thead>
              <tbody>
                {adminModerationMock.map(row => (
                  <tr key={row.id} className={styles.tableRow}>
                    <td>
                      <div className={styles.userCell}>
                        <img src={row.imagen} alt="User" className={styles.tableAvatar} />
                        <span>{row.usuario}</span>
                      </div>
                    </td>
                    <td>{row.tipo}</td>
                    <td>{row.detalles}</td>
                    <td>{row.estado}</td>
                    <td>
                      <button className={styles.actionBtn}>Amarillo Oro</button>
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
};

export default AdminDashboardModule;
