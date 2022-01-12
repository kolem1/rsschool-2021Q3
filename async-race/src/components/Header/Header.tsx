import { Container } from '../Container/Container';
import { Nav } from '../Nav/Nav';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <Nav
          links={[
            { path: '/', text: 'To Garage' },
            { path: '/winners', text: 'To Winners' }
          ]}
        ></Nav>
      </Container>
    </header>
  );
};
