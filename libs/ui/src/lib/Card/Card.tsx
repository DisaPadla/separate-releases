import styles from './Card.module.css';

export interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Card({ title, description, children, footer }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {children && <div className={styles.body}>{children}</div>}
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}

export default Card;
