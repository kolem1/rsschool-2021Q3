import { FC, ChangeEventHandler } from 'react';
import { ICarParams } from '../../types/cars';
import { Button, TextInput } from '../UI';
import styles from './CarEditor.module.css';

interface ICarEditorParams {
  buttonText: string;
  car: ICarParams;
  handleTextChange: ChangeEventHandler<HTMLInputElement>;
  handleColorChange: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: () => Promise<void>;
  disabled?: boolean;
}

export const CarEditor: FC<ICarEditorParams> = ({
  buttonText,
  car,
  handleTextChange,
  handleColorChange,
  handleSubmit,
  disabled
}) => {
  return (
    <div className={styles.wrapper}>
      <TextInput disabled={disabled} value={car.name} onChange={handleTextChange} />
      <input
        disabled={disabled}
        className={styles.color}
        type="color"
        value={car.color}
        onChange={handleColorChange}
      />
      <Button disabled={disabled} type="button" onClick={handleSubmit}>
        {buttonText}
      </Button>
    </div>
  );
};

CarEditor.defaultProps = {
  disabled: false
};
