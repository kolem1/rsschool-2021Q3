import React, { useContext } from 'react';
import { MainContext } from '../../App';
import { Filter, ToysList } from '../../components';
import LottieAnimation from '../../components/LottieAnimation/LottieAnimation';
import './Toys.css';

export const Toys: React.FC = function () {
  const { toysData } = useContext(MainContext);
  return (
    <div className="toys-page">
      <div className="container">
        <div className="toys-page__filter">
          <Filter />
        </div>
        <div className="toys-page__list">
          {toysData &&
            (toysData.length ? (
              <ToysList toysData={toysData} />
            ) : (
              <div className="toys-page__empty">
                <div className="toys-page__animation">
                  <LottieAnimation name="gifts" path={`${process.env.PUBLIC_URL}/gifts.json`} />
                </div>
                <b>К сожалению, ничего не найдено :(</b>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
