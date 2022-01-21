import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Transition, TransitionStatus } from 'react-transition-group';
import { CarSvg } from '..';
import { driveEngine, startEngine, stopEngine } from '../../api';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { addResult } from '../../store/actions/raceActions';
import { ICar } from '../../types/cars';
import styles from './Car.module.css';

interface ICarProps {
  car: ICar;
}

export const Car: FC<PropsWithChildren<ICarProps>> = ({ car, children }) => {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [position, setPosition] = useState(0);
  const { raceIsStarted, winnerIsVacant } = useTypedSelector((state) => state.race);

  const carRef = useRef<HTMLDivElement>(null);

  const startCar = async (isRace = false) => {
    const { distance, velocity } = await startEngine(car.id);
    const time = Math.round(distance / velocity);
    setDuration(time);
    setIsStarted(true);
    try {
      const result = await driveEngine(car.id);
      stopEngine(car.id);
      if (winnerIsVacant && isRace) {
        dispatch(addResult({ id: car.id, time: Math.round(time / 100) / 10, result }));
      }
      setIsStarted(false);
      setPosition(100);
    } catch (err) {
      stopEngine(car.id);
      const carEl = carRef.current;
      if (!carEl) throw new Error('Car Element is not find');
      const computedStyle = window.getComputedStyle(carEl);
      setIsStarted(false);
      const left = parseInt(computedStyle.left);
      const parent = carEl.parentElement as HTMLElement;
      const parentWidth = parent.offsetWidth;
      setPosition((left / parentWidth) * 100);
    }
  };

  useEffect(() => {
    if (raceIsStarted) {
      startCar(true);
    } else {
      setDuration(0);
      setPosition(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raceIsStarted]);

  const defaultStyle = {
    transition: `left ${duration}ms linear`,
    left: 0
  };

  const transitionStyles = {
    entering: { left: '100%' },
    entered: { left: '100%' },
    exiting: { left: `${position}%` },
    exited: { left: `${position}%` }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <div>{children}</div>
      <h3 style={{ margin: 0 }}>{car.name}</h3>
      <div>
        <button onClick={() => startCar()} disabled={isStarted || raceIsStarted}>
          Start
        </button>
        <button
          onClick={() => {
            stopEngine(car.id);
            setDuration(0);
            setIsStarted(false);
            setPosition(0);
          }}
          disabled={position === 0 && !isStarted}
        >
          Stop
        </button>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.track}>
          <Transition
            in={isStarted}
            timeout={{
              enter: duration,
              exit: 0
            }}
          >
            {(state: TransitionStatus) => (
              <div
                ref={carRef}
                className={styles.car}
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state as keyof typeof transitionStyles]
                }}
              >
                <CarSvg color={car.color} />
              </div>
            )}
            {/* <CarSvg color={car.color} /> */}
          </Transition>
        </div>
        <div
          style={{
            width: 150
          }}
        ></div>
      </div>
    </div>
  );
};
