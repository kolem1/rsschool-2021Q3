import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

interface NavItem {
  path: string;
  text: string;
}

interface NavProps {
  links: NavItem[];
}

export const Nav: FC<NavProps> = ({ links }) => (
  <nav>
    <ul className={styles.list}>
      {links &&
        links.map((link) => (
          <li key={link.path} className={styles.item}>
            {<Link to={link.path}>{link.text}</Link>}
          </li>
        ))}
    </ul>
  </nav>
);
