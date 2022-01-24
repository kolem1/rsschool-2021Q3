import { FC, memo, ChangeEventHandler } from 'react';
import { ICar, ICarParams } from '../../types/cars';
import { IRaceResult } from '../../types/race';
import { Car, CarEditor, Page, PageCounter, PageTitle, Pagination, Popup } from '../../components';
import { Button } from '../../components/UI';
import styles from './Garage.module.css';
import flag from './img/flag.png';

interface IGarageViewParams {
  raceIsStarted: boolean;
  handleStartRaceClick: () => void;
  handleStopRaceClick: () => void;
  hanldeGenerateCarsClick: () => Promise<void>;
  createdCar: ICarParams;
  selectedCar: ICar;
  onCreatedTextChange: ChangeEventHandler<HTMLInputElement>;
  onCreatedColorChange: ChangeEventHandler<HTMLInputElement>;
  onSubmitCreatedCar: () => Promise<void>;
  onEditedTextChange: ChangeEventHandler<HTMLInputElement>;
  onEditedColorChange: ChangeEventHandler<HTMLInputElement>;
  onSubmitEditedCar: () => Promise<void>;
  total: number;
  totalPages: number;
  page: number;
  cars: ICar[];
  setSelectedCar: (car: ICar) => void;
  onRemoveCarClick: (carId: number) => Promise<void>;
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  showModal: boolean;
  winningCar: ICar | null;
  winner: IRaceResult | null;
}

const GarageViewComponent: FC<IGarageViewParams> = ({
  raceIsStarted,
  handleStartRaceClick,
  handleStopRaceClick,
  hanldeGenerateCarsClick,
  createdCar,
  selectedCar,
  onCreatedTextChange,
  onCreatedColorChange,
  onSubmitCreatedCar,
  onEditedTextChange,
  onEditedColorChange,
  onSubmitEditedCar,
  total,
  totalPages,
  page,
  cars,
  setSelectedCar,
  onRemoveCarClick,
  onNextPageClick,
  onPrevPageClick,
  showModal,
  winningCar,
  winner
}) => {
  return (
    <Page>
      <div className={styles.buttonsWrapper}>
        <Button
          className={styles.notLastButton}
          onClick={handleStartRaceClick}
          disabled={raceIsStarted}
        >
          Race
        </Button>
        <Button
          className={styles.notLastButton}
          onClick={handleStopRaceClick}
          disabled={!raceIsStarted}
        >
          Reset
        </Button>
        <Button isAccent onClick={hanldeGenerateCarsClick}>
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
        Page {page} {totalPages > 1 && `of ${totalPages}`}
      </PageCounter>
      {cars.map((car) => (
        <Car key={car.id} car={car}>
          <Button
            className={styles.notLastButton}
            type="button"
            onClick={() => {
              setSelectedCar(car);
            }}
          >
            Select
          </Button>
          <Button
            type="button"
            onClick={() => {
              onRemoveCarClick(car.id);
            }}
          >
            Remove
          </Button>
        </Car>
      ))}
      <Pagination
        handleNextClick={onNextPageClick}
        handlePrevClick={onPrevPageClick}
        disabled={{
          prev: page === 1 || total === 0,
          next: page === totalPages || total === 0
        }}
      />
      {showModal && (
        <Popup>
          <div className={styles.popupInner}>
            <img className={styles.flag} src={flag} alt="" />
            <span>
              Winner is {winningCar && winningCar.name}({winner && winner.time}s)
            </span>
            <img className={styles.flag} src={flag} alt="" />
          </div>
        </Popup>
      )}
    </Page>
  );
};

export const GarageView = memo(GarageViewComponent);
