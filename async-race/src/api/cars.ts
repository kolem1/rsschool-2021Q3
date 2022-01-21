import { ICar, ICarParams } from '../types/cars';
import { IWinner } from '../types/winners';
import { generateCar } from '../utils';

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
  const winners = await fetch(`${process.env.REACT_APP_API_URL}/winners/`).then(
    (result) => result.json() as Promise<IWinner[]>
  );
  if (winners.find((item) => item.id === id)) {
    await fetch(`${process.env.REACT_APP_API_URL}/winners/${id}`, {
      method: 'DELETE'
    });
  }
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

export const getCar = async (id: number) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/garage/${id}`);
  const car = (await response.json()) as ICar;
  return car;
};

export const generateCars = async () => {
  const carsNumber = 100;
  const promises: Promise<void>[] = [];
  for (let i = 0; i < carsNumber; i++) {
    const car = generateCar();
    const promise = createCar(car);
    promises.push(promise);
  }
  return Promise.all(promises);
};
