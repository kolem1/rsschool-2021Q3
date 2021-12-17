import React, { useContext } from 'react';
import { Flipper } from 'react-flip-toolkit';
import { ToyCard } from '../ToyCard/ToyCard';
import './ToysList.css';
import { MainContext } from '../../App';

export const ToysList: React.FC = function () {
  const { toysData } = useContext(MainContext);
  return (
    <Flipper flipKey={JSON.stringify(toysData)}>
      <ul className="toys-list">
        {toysData?.length
          ? toysData.map((toy) => {
              return <ToyCard key={toy.num} toy={toy} />;
            })
          : 'Таких игрушек не найдено'}
      </ul>
    </Flipper>
  );
};
