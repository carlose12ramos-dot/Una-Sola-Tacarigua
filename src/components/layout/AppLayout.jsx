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
      <a href="/admin.html" className={styles.adminFab}>
        Ver Vista Admin
      </a>
    </div>
  );
};

export default AppLayout;
