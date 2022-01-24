import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import styles from './Button.module.css';

export const Button: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, ...rest }) => (
  <button className={styles.button} {...rest}>
    {children}
  </button>
);
