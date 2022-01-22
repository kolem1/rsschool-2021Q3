import { forwardRef, memo, ReactNode, ForwardedRef } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import { CarSvg } from '..';
import { ICar } from '../../types/cars';
import styles from './Car.module.css';

interface ICarProps {
  car: ICar;
  position: number;
  animationDuration: number;
  carIsStarted: boolean;
  raceIsStarted: boolean;
  handleStartButton: () => void;
  handleStopButton: () => void;
  children: ReactNode;
}

const CarViewComponent = forwardRef(
  (
    {
      car,
      animationDuration,
      position,
      carIsStarted,
      raceIsStarted,
      handleStartButton,
      handleStopButton,
      children
    }: ICarProps,
    carRef: ForwardedRef<HTMLDivElement>
  ) => {
    const defaultStyle = {
      transition: `left ${animationDuration}ms linear`,
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
          <button onClick={handleStartButton} disabled={carIsStarted || raceIsStarted}>
            Start
          </button>
          <button onClick={handleStopButton} disabled={position === 0 && !carIsStarted}>
            Stop
          </button>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.track}>
            <Transition
              in={carIsStarted}
              timeout={{
                enter: animationDuration,
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
  }
);

export const CarView = memo(CarViewComponent);
