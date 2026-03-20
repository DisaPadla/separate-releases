import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';

const featuredProducts = [
  { id: 1, name: 'Wireless Headphones', price: '$89.99', emoji: '🎧' },
  { id: 2, name: 'Mechanical Keyboard', price: '$129.99', emoji: '⌨️' },
  { id: 3, name: 'USB-C Hub', price: '$49.99', emoji: '🔌' },
];

export function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1>📦 Products Catalogue</h1>
        <p>Discover our wide range of quality tech products.</p>
        <Link to="/remote1/products" className={styles.ctaButton}>
          Browse All Products →
        </Link>
      </div>
      <section>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <div className={styles.grid}>
          {featuredProducts.map((p) => (
            <Link to={`/remote1/products/${p.id}`} key={p.id} className={styles.card}>
              <div className={styles.cardEmoji}>{p.emoji}</div>
              <h3>{p.name}</h3>
              <p className={styles.price}>{p.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
