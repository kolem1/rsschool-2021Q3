import { ReactNode, FC } from 'react';
import styles from './Popup.module.css';

interface PopupProps {
  children: ReactNode;
}

export const Popup: FC<PopupProps> = ({ children }) => (
  <div className={styles.popup}>{children}</div>
);
