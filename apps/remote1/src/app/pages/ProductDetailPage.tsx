import styles from './ProductDetailPage.module.css';
import { useParams, Link } from 'react-router-dom';

const products: Record<
  string,
  { name: string; price: string; emoji: string; category: string; description: string }
> = {
  '1': { name: 'Wireless Headphones', price: '$89.99', emoji: '🎧', category: 'Audio', description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio.' },
  '2': { name: 'Mechanical Keyboard', price: '$129.99', emoji: '⌨️', category: 'Input', description: 'Full-size mechanical keyboard with RGB backlight, tactile switches, and durable aluminium frame.' },
  '3': { name: 'USB-C Hub', price: '$49.99', emoji: '🔌', category: 'Accessories', description: '7-in-1 USB-C hub with HDMI 4K output, 3× USB-A ports, SD card reader, and 100W PD charging.' },
  '4': { name: '4K Monitor', price: '$349.99', emoji: '🖥️', category: 'Display', description: '27" 4K IPS monitor with 99% sRGB colour accuracy, 144Hz refresh rate, and ultra-thin bezels.' },
  '5': { name: 'Ergonomic Mouse', price: '$59.99', emoji: '🖱️', category: 'Input', description: 'Vertical ergonomic mouse designed to reduce wrist strain, with 6 programmable buttons.' },
  '6': { name: 'Webcam HD', price: '$79.99', emoji: '📷', category: 'Video', description: '1080p HD webcam with auto-focus, built-in dual microphone, and universal clip mount.' },
};

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = id ? products[id] : null;

  if (!product) {
    return (
      <div className={styles.notFound}>
        <p>Product not found.</p>
        <Link to="/remote1/products">← Back to Products</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Link to="/remote1/products" className={styles.back}>← Back to Products</Link>
      <div className={styles.detail}>
        <div className={styles.emoji}>{product.emoji}</div>
        <div className={styles.info}>
          <span className={styles.category}>{product.category}</span>
          <h1>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.priceRow}>
            <strong className={styles.price}>{product.price}</strong>
            <button className={styles.addButton}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
