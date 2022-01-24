import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { driveEngine, startEngine, stopEngine } from '../../api';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { addResult } from '../../store/actions/raceActions';
import { ICar } from '../../types/cars';
import { CarView } from './CarView';

interface ICarProps {
  car: ICar;
}

export const Car: FC<PropsWithChildren<ICarProps>> = ({ car, children }) => {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [position, setPosition] = useState(0);
  const { raceIsStarted, winnerIsVacant } = useTypedSelector((state) => state.race);

  const mountedRef = useRef(true);

  const carRef = useRef<HTMLDivElement>(null);

  const startCar = async (isRace = false) => {
    const { distance, velocity } = await startEngine(car.id);
    const time = Math.round(distance / velocity);
    setDuration(time);
    setIsStarted(true);
    try {
      const result = await driveEngine(car.id);
      stopEngine(car.id);
      if (mountedRef.current) {
        if (winnerIsVacant && isRace) {
          dispatch(addResult({ id: car.id, time: Math.round(time / 100) / 10, result }));
        }
        setIsStarted(false);
        setPosition(100);
      }
    } catch (err) {
      stopEngine(car.id);
      if (!mountedRef.current) return;
      const carEl = carRef.current;
      if (!carEl) throw new Error('Car is not found');
      const computedStyle = window.getComputedStyle(carEl);
      setIsStarted(false);
      const left = parseInt(computedStyle.left);
      const parent = carEl.parentElement as HTMLElement;
      const parentWidth = parent.offsetWidth;
      setPosition((left / parentWidth) * 100);
    }
  };

  const handleStopClick = () => {
    stopEngine(car.id);
    setDuration(0);
    setIsStarted(false);
    setPosition(0);
  };

  useEffect(() => {
    if (raceIsStarted) {
      startCar(true);
    } else {
      setIsStarted(false);
      setDuration(0);
      setPosition(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raceIsStarted]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <CarView
      car={car}
      position={position}
      animationDuration={duration}
      raceIsStarted={raceIsStarted}
      carIsStarted={isStarted}
      handleStartButton={() => startCar()}
      handleStopButton={handleStopClick}
      ref={carRef}
    >
      {children}
    </CarView>
  );
};
