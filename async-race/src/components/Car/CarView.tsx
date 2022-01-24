import { forwardRef, memo, ReactNode, ForwardedRef } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import { CarSvg } from '..';
import { ICar } from '../../types/cars';
import { EngineButton } from '../UI';
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
        <div className={styles.header}>
          <div>{children}</div>
          <h3 className={styles.title}>{car.name}</h3>
        </div>
        <div className={`${styles.flex} ${styles.road}`}>
          <div className={styles.buttons}>
            <EngineButton
              className={styles.launchButton}
              onClick={handleStartButton}
              disabled={position !== 0 || carIsStarted || raceIsStarted}
            >
              A
            </EngineButton>
            <EngineButton onClick={handleStopButton} disabled={position === 0 && !carIsStarted}>
              B
            </EngineButton>
          </div>
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
            </Transition>
          </div>
          <div className={styles.finish}></div>
        </div>
      </div>
    );
  }
);

export const CarView = memo(CarViewComponent);
