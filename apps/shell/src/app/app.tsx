import * as React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import styles from './app.module.css';

const Remote1 = React.lazy(() => import('remote1/Module'));
const Remote2 = React.lazy(() => import('remote2/Module'));

function HomePage() {
  return (
    <div className={styles.homePage}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>🚀 Micro-Frontend Shell</h1>
        <p className={styles.heroSubtitle}>
          A React monorepo with NX and Webpack Module Federation.
          Navigate to the remote applications below.
        </p>
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardIcon}>📦</div>
          <h2>Remote App 1</h2>
          <p>Products catalogue micro-frontend with browsing and detail views.</p>
          <Link to="/remote1" className={styles.cardLink}>Open Remote 1 →</Link>
        </div>
        <div className={styles.card}>
          <div className={styles.cardIcon}>📊</div>
          <h2>Remote App 2</h2>
          <p>Analytics dashboard micro-frontend with charts and settings.</p>
          <Link to="/remote2" className={styles.cardLink}>Open Remote 2 →</Link>
        </div>
      </div>
    </div>
  );
}

function NavBar() {
  const location = useLocation();
  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav className={styles.nav}>
      <div className={styles.navBrand}>
        <Link to="/" className={styles.brand}>⚡ Shell App</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/" className={`${styles.navLink} ${isActive('/') ? styles.navLinkActive : ''}`}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/remote1" className={`${styles.navLink} ${isActive('/remote1') ? styles.navLinkActive : ''}`}>
            Remote 1
          </Link>
        </li>
        <li>
          <Link to="/remote2" className={`${styles.navLink} ${isActive('/remote2') ? styles.navLinkActive : ''}`}>
            Remote 2
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export function App() {
  return (
    <div className={styles.appContainer}>
      <NavBar />
      <main className={styles.main}>
        <React.Suspense
          fallback={
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <span>Loading remote module...</span>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/remote1/*" element={<Remote1 />} />
            <Route path="/remote2/*" element={<Remote2 />} />
          </Routes>
        </React.Suspense>
      </main>
    </div>
  );
}

export default App;
