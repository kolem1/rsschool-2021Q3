import { ReactNode, FC } from 'react';
import { Container } from '..';
import styles from './Page.module.css';

interface IPageProps {
  children: ReactNode;
}

export const Page: FC<IPageProps> = ({ children }) => (
  <div className={styles.wrapper}>
    <Container>{children}</Container>
  </div>
);
