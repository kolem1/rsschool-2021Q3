import { FC } from 'react';
import { Button } from '../UI';
import styles from './Pagination.module.css';

interface IPaginationProps {
  disabled: {
    next: boolean;
    prev: boolean;
  };
  handleNextClick: () => void;
  handlePrevClick: () => void;
}

export const Pagination: FC<IPaginationProps> = ({
  disabled,
  handleNextClick,
  handlePrevClick
}) => {
  return (
    <div>
      <Button
        className={styles.nextButton}
        isAccent
        disabled={disabled.prev}
        onClick={handlePrevClick}
      >
        prev
      </Button>
      <Button isAccent disabled={disabled.next} onClick={handleNextClick}>
        Next
      </Button>
    </div>
  );
};
