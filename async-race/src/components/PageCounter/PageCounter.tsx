import { FC, ReactNode } from 'react';
import styles from './PageCounter.module.css';

interface IPageCounterParams {
  children: ReactNode;
}

export const PageCounter: FC<IPageCounterParams> = ({ children }) => (
  <h2 className={styles.counter}>{children}</h2>
);
