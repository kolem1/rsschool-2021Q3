import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CarSvg, Container } from '../../components';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchCars, setCarsPage } from '../../store/actions/carsActions';
import { createCar } from '../../api';
import { ICarParams } from '../../types/cars';
import { TextInput } from '../../components/UI';

export const Garage = () => {
  const { page, cars, total } = useTypedSelector((state) => state.cars);
  const dispatch = useDispatch();
  const defaultState = { name: '', color: '#ffffff' };
  const [createdCar, setCreatedCar] = useState<ICarParams>(defaultState);
  const totalPages = Math.ceil(total / 7);

  useEffect(() => {
    dispatch(fetchCars(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div>
      <Container>
        <div>
          <TextInput
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
              if (createdCar.name.trim()) {
                await createCar(createdCar);
                setCreatedCar(defaultState);
                dispatch(fetchCars(page));
              }
            }}
          >
            CreateCar
          </button>
        </div>
        <h1>Garage ({total})</h1>
        {cars.map((car) => (
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
        <div>
          <button
            disabled={page === 1}
            onClick={() => {
              dispatch(setCarsPage(page - 1));
              dispatch(fetchCars(page));
            }}
          >
            prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={async () => {
              dispatch(setCarsPage(page + 1));
              dispatch(fetchCars(page));
            }}
          >
            Next
          </button>
        </div>
      </Container>
    </div>
  );
};
