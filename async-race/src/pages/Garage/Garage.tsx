import { ChangeEventHandler, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchCars, setCarsPage } from '../../store/actions/carsActions';
import { createCar, deleteCar, updateCar, generateCars, setWinner } from '../../api';
import { ICarParams, ICar } from '../../types/cars';
import { startRace, stopRace } from '../../store/actions/raceActions';
import { GarageView } from './GarageView';

export const Garage = () => {
  const { page, cars, total } = useTypedSelector((state) => state.cars);
  const { raceIsStarted, winner, results } = useTypedSelector((state) => state.race);
  const dispatch = useDispatch();

  const defaultCreatedCar = { name: '', color: '#ffffff' };
  const [createdCar, setCreatedCar] = useState<ICarParams>(defaultCreatedCar);

  const carsLimit = 7;
  const totalPages = Math.ceil(total / carsLimit);

  const defaultSelectedCar = { id: 0, name: '', color: '#ffffff' };
  const [selectedCar, setSelectedCar] = useState<ICar>(defaultSelectedCar);

  const [showModal, setShowModal] = useState(false);
  const [winningCar, setWinningCar] = useState<ICar | null>(null);

  const [disableReset, setDisableReset] = useState(true);

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
      if (total % carsLimit === 0) {
        lastPage += 1;
      }
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
    console.log(cars.length, results);
    if (results === cars.length) {
      setDisableReset(false);
    } else {
      setDisableReset(true);
    }
  }, [results, cars]);

  useEffect(() => {
    return () => {
      dispatch(stopRace());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GarageView
      disableReset={disableReset}
      raceIsStarted={raceIsStarted}
      handleStartRaceClick={() => dispatch(startRace())}
      handleStopRaceClick={() => dispatch(stopRace())}
      hanldeGenerateCarsClick={async () => {
        await generateCars();
        dispatch(fetchCars(page));
      }}
      createdCar={createdCar}
      selectedCar={selectedCar}
      onCreatedTextChange={onCreatedTextChange}
      onCreatedColorChange={onCreatedColorChange}
      onSubmitCreatedCar={onSubmitCreatedCar}
      onEditedTextChange={onEditedTextChange}
      onEditedColorChange={onEditedColorChange}
      onSubmitEditedCar={onSubmitEditedCar}
      total={total}
      page={page}
      totalPages={totalPages}
      cars={cars}
      setSelectedCar={setSelectedCar}
      onRemoveCarClick={async (carId) => {
        await deleteCar(carId);
        let lastPage = page;
        if (cars.length === 1) lastPage -= 1;
        dispatch(setCarsPage(lastPage));
      }}
      onNextPageClick={() => {
        dispatch(setCarsPage(page + 1));
      }}
      onPrevPageClick={() => {
        dispatch(setCarsPage(page - 1));
      }}
      showModal={showModal}
      winningCar={winningCar}
      winner={winner}
    />
  );
};
