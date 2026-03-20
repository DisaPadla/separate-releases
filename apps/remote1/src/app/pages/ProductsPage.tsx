import styles from './ProductsPage.module.css';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Wireless Headphones', price: '$89.99', emoji: '🎧', category: 'Audio' },
  { id: 2, name: 'Mechanical Keyboard', price: '$129.99', emoji: '⌨️', category: 'Input' },
  { id: 3, name: 'USB-C Hub', price: '$49.99', emoji: '🔌', category: 'Accessories' },
  { id: 4, name: '4K Monitor', price: '$349.99', emoji: '🖥️', category: 'Display' },
  { id: 5, name: 'Ergonomic Mouse', price: '$59.99', emoji: '🖱️', category: 'Input' },
  { id: 6, name: 'Webcam HD', price: '$79.99', emoji: '📷', category: 'Video' },
];

export function ProductsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1>All Products</h1>
        <p>{products.length} items</p>
      </div>
      <div className={styles.grid}>
        {products.map((p) => (
          <Link to={`/remote1/products/${p.id}`} key={p.id} className={styles.card}>
            <div className={styles.emoji}>{p.emoji}</div>
            <div className={styles.info}>
              <span className={styles.category}>{p.category}</span>
              <h3>{p.name}</h3>
              <strong className={styles.price}>{p.price}</strong>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
