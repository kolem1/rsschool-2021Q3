import { ICarParams } from '../types/cars';

export const createCar = async ({ name, color }: ICarParams) => {
  await fetch(`${process.env.REACT_APP_API_URL}/garage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, color })
  });
};
