import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Car, Container } from '../../components';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchCars, setCarsPage } from '../../store/actions/carsActions';
import { createCar, deleteCar, updateCar, generateCars, setWinner } from '../../api';
import { ICarParams, ICar } from '../../types/cars';
import { TextInput } from '../../components/UI';
import { startRace, stopRace } from '../../store/actions/raceActions';

export const Garage = () => {
  const { page, cars, total } = useTypedSelector((state) => state.cars);
  const { raceIsStarted, winner } = useTypedSelector((state) => state.race);
  const dispatch = useDispatch();

  const defaultCreatedCar = { name: '', color: '#ffffff' };
  const [createdCar, setCreatedCar] = useState<ICarParams>(defaultCreatedCar);

  const carsLimit = 7;
  const totalPages = Math.ceil(total / carsLimit);

  const defaultSelectedCar = { id: 0, name: '', color: '#ffffff' };
  const [selectedCar, setSelectedCar] = useState<ICar>(defaultSelectedCar);

  const [showModal, setShowModal] = useState(false);
  const [winningCar, setWinningCar] = useState<ICar | null>(null);

  useEffect(() => {
    dispatch(fetchCars(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (winner) {
      setWinner(winner.id, winner.time);
      const car = cars.find((item) => item.id === winner.id);
      if (!car) throw new Error('Winner is not found');
      setWinningCar(car);
      setShowModal(true);
      setTimeout(() => setShowModal(false), 4000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner]);

  return (
    <div>
      <Container>
        <button onClick={() => dispatch(startRace())} disabled={raceIsStarted}>
          Race
        </button>
        <button onClick={() => dispatch(stopRace())} disabled={!raceIsStarted}>
          Reset
        </button>
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
                let lastPage = totalPages;
                console.log(cars.length);
                if (total % carsLimit === 0) {
                  lastPage += 1;
                }
                console.log(lastPage);
                setCreatedCar(defaultCreatedCar);
                dispatch(setCarsPage(lastPage));
                dispatch(fetchCars(lastPage));
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
        <h2>
          Page {page} {totalPages > 1 && `from ${totalPages}`}
        </h2>
        {cars.map((car) => (
          <Car key={car.id} car={car}>
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
          </Car>
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
      {showModal && (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            top: '50%',
            left: '50%'
          }}
        >
          Winner is {winningCar && winningCar.name}({winner && winner.time}s)
        </div>
      )}
    </div>
  );
};
