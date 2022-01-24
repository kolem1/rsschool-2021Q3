import { ChangeEventHandler, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Car, CarEditor, Page, PageCounter, PageTitle } from '../../components';
import { fetchCars, setCarsPage } from '../../store/actions/carsActions';
import { createCar, deleteCar, updateCar, generateCars, setWinner } from '../../api';
import { ICarParams, ICar } from '../../types/cars';
import { Button } from '../../components/UI';
import { startRace, stopRace } from '../../store/actions/raceActions';
import styles from './Garage.module.css';

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

  const onEditedTextChange: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setSelectedCar({ ...selectedCar, name: target.value });

  const onEditedColorChange: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setSelectedCar({ ...selectedCar, color: target.value });

  const onSubmitEditedCar = async () => {
    if (selectedCar.name.trim()) {
      await updateCar(selectedCar);
      setSelectedCar(defaultSelectedCar);
      dispatch(fetchCars(page));
    }
  };

  const onCreatedTextChange: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setCreatedCar({ ...createdCar, name: target.value });

  const onCreatedColorChange: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setCreatedCar({ ...createdCar, color: target.value });

  const onSubmitCreatedCar = async () => {
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
    }
  };

  useEffect(() => {
    dispatch(fetchCars(page));
    dispatch(stopRace());
    setSelectedCar(defaultSelectedCar);
    setShowModal(false);
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

  useEffect(() => {
    return () => {
      dispatch(stopRace());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page>
      <div className={styles.buttonsWrapper}>
        <Button
          className={styles.notLastButton}
          onClick={() => dispatch(startRace())}
          disabled={raceIsStarted}
        >
          Race
        </Button>
        <Button
          className={styles.notLastButton}
          onClick={() => dispatch(stopRace())}
          disabled={!raceIsStarted}
        >
          Reset
        </Button>
        <Button
          isAccent
          onClick={async () => {
            await generateCars();
            dispatch(fetchCars(page));
          }}
        >
          Generate Cars
        </Button>
      </div>
      <CarEditor
        buttonText="Create Car"
        car={createdCar}
        handleTextChange={onCreatedTextChange}
        handleColorChange={onCreatedColorChange}
        handleSubmit={onSubmitCreatedCar}
      />
      <CarEditor
        buttonText="Update Car"
        car={selectedCar}
        handleTextChange={onEditedTextChange}
        handleColorChange={onEditedColorChange}
        handleSubmit={onSubmitEditedCar}
        disabled={!selectedCar.id}
      />
      <PageTitle>Garage ({total})</PageTitle>
      <PageCounter>
        Page {page} {totalPages > 1 && `from ${totalPages}`}
      </PageCounter>
      {cars.map((car) => (
        <Car key={car.id} car={car}>
          <Button
            className={styles.notLastButton}
            type="button"
            onClick={async () => {
              setSelectedCar(car);
            }}
          >
            Select
          </Button>
          <Button
            type="button"
            onClick={async () => {
              await deleteCar(car.id);
              dispatch(fetchCars(page));
            }}
          >
            Remove
          </Button>
        </Car>
      ))}
      <div className={styles.pagination}>
        <Button
          isAccent
          disabled={page === 1 || total === 0}
          onClick={() => {
            dispatch(setCarsPage(page - 1));
          }}
        >
          prev
        </Button>
        <Button
          isAccent
          disabled={page === totalPages || total === 0}
          onClick={async () => {
            dispatch(setCarsPage(page + 1));
          }}
        >
          Next
        </Button>
      </div>
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
    </Page>
  );
};
