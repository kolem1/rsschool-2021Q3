import { FC, PropsWithChildren, ReactNode } from 'react';
import { Header } from './components/Header/Header';
import styles from './App.module.css';

interface AppProps {
  children: ReactNode;
}

export const AppView: FC<PropsWithChildren<AppProps>> = ({ children }) => (
  <div className={styles.wrapper}>
    <Header />
    <div className={styles.main}>{children}</div>
  </div>
);
