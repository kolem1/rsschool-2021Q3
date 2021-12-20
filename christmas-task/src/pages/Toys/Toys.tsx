import React, { useContext } from 'react';
import { MainContext } from '../../App';
import { Filter, ToysList } from '../../components';

export const Toys: React.FC = function () {
  const { toysData } = useContext(MainContext);
  return (
    <div className="toys-page">
      <div className="container">
        <div className="toys-page__filter">
          <Filter />
        </div>
        <div className="toys-page__list">
          {toysData && (toysData.length ? <ToysList toysData={toysData} /> : 'Таких игрушек не найдено')}
        </div>
      </div>
    </div>
  );
};
