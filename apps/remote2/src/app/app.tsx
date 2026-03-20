import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import styles from './app.module.css';

function Remote2Nav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');
  return (
    <nav className={styles.nav}>
      <span className={styles.appLabel}>📊 Remote App 2</span>
      <ul className={styles.navLinks}>
        <li>
          <Link
            to="/remote2"
            className={`${styles.navLink} ${isActive('/remote2') && !isActive('/remote2/settings') ? styles.active : ''}`}
          >Dashboard</Link>
        </li>
        <li>
          <Link
            to="/remote2/settings"
            className={`${styles.navLink} ${isActive('/remote2/settings') ? styles.active : ''}`}
          >Settings</Link>
        </li>
      </ul>
    </nav>
  );
}

export function App() {
  return (
    <div className={styles.container}>
      Remote 2
      <Remote2Nav />
      <div className={styles.content}>
        <Routes>
          <Route path="/remote2" element={<DashboardPage />} />
          <Route path="/remote2/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
