import styles from './NavLink.module.css';
import { Link, useMatch } from 'react-router-dom';

export interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

export function NavLink({ to, children }: NavLinkProps) {
  const match = useMatch({ path: to, end: to === '/' });
  return (
    <Link
      to={to}
      className={`${styles.link} ${match ? styles.active : ''}`}
    >
      {children}
    </Link>
  );
}

export default NavLink;
