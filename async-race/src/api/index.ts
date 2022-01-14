import { ICarParams, ICar } from '../types/cars';

export const createCar = async ({ name, color }: ICarParams) => {
  await fetch(`${process.env.REACT_APP_API_URL}/garage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, color })
  });
};

export const deleteCar = async (id: number) => {
  await fetch(`${process.env.REACT_APP_API_URL}/garage/${id}`, {
    method: 'DELETE'
  });
};

export const updateCar = async ({ id, name, color }: ICar) => {
  await fetch(`${process.env.REACT_APP_API_URL}/garage/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, color })
  });
};
