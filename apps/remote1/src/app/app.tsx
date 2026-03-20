import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import styles from './app.module.css';

function Remote1Nav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');
  return (
    <nav className={styles.nav}>
      <span className={styles.appLabel}>📦 Remote App 1</span>
      <ul className={styles.navLinks}>
        <li>
          <Link
            to="/remote1"
            className={`${styles.navLink} ${location.pathname === '/remote1' ? styles.active : ''}`}
          >Home</Link>
        </li>
        <li>
          <Link
            to="/remote1/products"
            className={`${styles.navLink} ${isActive('/remote1/products') ? styles.active : ''}`}
          >Products</Link>
        </li>
      </ul>
    </nav>
  );
}

export function App() {
  return (
    <div className={styles.container}>
      Remote 1 HAHAHAHAH
      <Remote1Nav />
      <div className={styles.content}>
        <Routes>
          <Route path="/remote1" element={<HomePage />} />
          <Route path="/remote1/products" element={<ProductsPage />} />
          <Route path="/remote1/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
