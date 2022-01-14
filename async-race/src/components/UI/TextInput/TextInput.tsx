import { FC, InputHTMLAttributes } from 'react';
import styles from './TextInput.module.css';

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const TextInput: FC<TextInputProps> = (props) => (
  <input className={styles.input} type="text" {...props} />
);
