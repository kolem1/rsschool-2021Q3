import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CarSvg, Container } from '../../components';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchCars, setCarsPage } from '../../store/actions/carsActions';
import { createCar, deleteCar, updateCar, generateCars } from '../../api';
import { ICarParams, ICar } from '../../types/cars';
import { TextInput } from '../../components/UI';

export const Garage = () => {
  const { page, cars, total } = useTypedSelector((state) => state.cars);
  const dispatch = useDispatch();

  const defaultCreatedCar = { name: '', color: '#ffffff' };
  const [createdCar, setCreatedCar] = useState<ICarParams>(defaultCreatedCar);

  const carsLimit = 7;
  const totalPages = Math.ceil(total / carsLimit);

  const defaultSelectedCar = { id: 0, name: '', color: '#ffffff' };
  const [selectedCar, setSelectedCar] = useState<ICar>(defaultSelectedCar);

  useEffect(() => {
    dispatch(fetchCars(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div>
      <Container>
        <button
          onClick={async () => {
            await generateCars();
            dispatch(fetchCars(page));
          }}
        >
          Generate Cars
        </button>
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
                setCreatedCar(defaultCreatedCar);
                dispatch(fetchCars(page));
              }
            }}
          >
            Create Car
          </button>
        </div>
        <div>
          <TextInput
            value={selectedCar.name}
            onChange={({ target }) => setSelectedCar({ ...selectedCar, name: target.value })}
            disabled={!selectedCar.id}
          />
          <input
            type="color"
            value={selectedCar.color}
            onChange={({ target }) => setSelectedCar({ ...selectedCar, color: target.value })}
            disabled={!selectedCar.id}
          />
          <button
            type="button"
            onClick={async () => {
              if (selectedCar.name.trim()) {
                await updateCar(selectedCar);
                setSelectedCar(defaultSelectedCar);
                dispatch(fetchCars(page));
              }
            }}
            disabled={!selectedCar.id}
          >
            Update Car
          </button>
        </div>
        <h1>Garage ({total})</h1>
        {cars.map((car) => (
          <div key={car.id}>
            <button
              type="button"
              onClick={async () => {
                setSelectedCar(car);
              }}
            >
              Select
            </button>
            <button
              type="button"
              onClick={async () => {
                await deleteCar(car.id);
                dispatch(fetchCars(page));
              }}
            >
              Remove
            </button>
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
            disabled={page === 1 || total === 0}
            onClick={() => {
              dispatch(setCarsPage(page - 1));
              dispatch(fetchCars(page));
            }}
          >
            prev
          </button>
          <button
            disabled={page === totalPages || total === 0}
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
