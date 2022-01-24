import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import styles from './Button.module.css';

interface IButton
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  isAccent?: boolean;
}

export const Button: FC<IButton> = ({ isAccent, className, children, ...rest }) => (
  <button
    className={`${styles.button}${isAccent ? ` ${styles.accent}` : ''}${
      className ? ` ${className}` : ''
    }`}
    {...rest}
  >
    {children}
  </button>
);

Button.defaultProps = {
  isAccent: false
};
