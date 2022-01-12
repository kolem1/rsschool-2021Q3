import { FC, PropsWithChildren, ReactNode } from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
}

export const Container: FC<PropsWithChildren<ContainerProps>> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);
