import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CarSvg, Container } from '../../components';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchCars } from '../../store/actions/carsActions';
import { createCar } from '../../api';
import { ICarParams } from '../../types/cars';

export const Garage = () => {
  const cars = useTypedSelector((state) => state.cars);
  const dispatch = useDispatch();
  const defaultState = { name: '', color: '#ffffff' };
  const [createdCar, setCreatedCar] = useState<ICarParams>(defaultState);

  useEffect(() => {
    dispatch(fetchCars());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Container>
        <div>
          <input
            type="text"
            value={createdCar.name}
            onChange={({ target }) => setCreatedCar({ ...createdCar, name: target.value })}
          />
          <input
            type="color"
            value={createdCar.color}
            onChange={({ target }) => setCreatedCar({ ...createdCar, color: target.value })}
          />
          <button
            type="button"
            onClick={async () => {
              await createCar(createdCar);
              dispatch(fetchCars());
              setCreatedCar(defaultState);
            }}
          >
            CreateCar
          </button>
        </div>
        <h1>Garage ({cars.total})</h1>
        {cars.cars.map((car) => (
          <div key={car.id}>
            {car.name}
            <div
              style={{
                width: 100
              }}
            >
              <CarSvg color={car.color} />
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
};
