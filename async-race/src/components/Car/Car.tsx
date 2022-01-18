import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import { CarSvg } from '..';
import { driveEngine, startEngine, stopEngine } from '../../api';
import { ICar } from '../../types/cars';

interface ICarProps {
  car: ICar;
  started?: boolean;
}

export const Car: FC<PropsWithChildren<ICarProps>> = ({ car, started = false, children }) => {
  const [duration, setDuration] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [position, setPosition] = useState(0);

  const carRef = useRef<HTMLDivElement>(null);

  const startCar = async () => {
    const { distance, velocity } = await startEngine(car.id);
    const time = distance / velocity;
    setDuration(time);
    setIsStarted(true);
    try {
      await driveEngine(car.id);
      setIsStarted(false);
      setPosition(100);
    } catch (err) {
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
    if (started) {
      startCar();
    }
  }, [started]);

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
        <button onClick={startCar}>Start</button>
        <button
          onClick={async () => {
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
      <div
        style={{
          display: 'flex'
        }}
      >
        <div
          style={{
            height: 35,
            flexGrow: 1,
            position: 'relative'
          }}
        >
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
                style={{
                  width: 100,
                  position: 'absolute',
                  bottom: 0,
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
