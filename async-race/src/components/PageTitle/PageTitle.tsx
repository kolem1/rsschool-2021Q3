import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import styles from './PageTitle.module.css';

export const PageTitle: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
> = ({ className, children }) => {
  return <h1 className={`${styles.title}${className ? ` ${className}` : ''}`}>{children}</h1>;
};
