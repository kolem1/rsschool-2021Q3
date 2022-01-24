import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import styles from './EngineButton.module.css';

export const EngineButton: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, ...rest }) => (
  <button className={styles.button} {...rest}>
    {children}
  </button>
);
