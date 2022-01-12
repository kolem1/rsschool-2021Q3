import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchCars } from '../../store/actions/carsActions';

export const Garage = () => {
  const cars = useTypedSelector((state) => state.cars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, []);

  console.log(cars);

  return (
    <div>
      {cars.cars.map((car) => (
        <div key={car.id}>{car.name}</div>
      ))}
    </div>
  );
};
