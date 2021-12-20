import React from 'react';
import { Flipper } from 'react-flip-toolkit';
import { ToyCard } from '../ToyCard/ToyCard';
import './ToysList.css';
import { IToy } from '../../types';

interface IToysList {
  toysData: IToy[];
}

export const ToysList: React.FC<IToysList> = function ({ toysData }) {
  return (
    <Flipper flipKey={JSON.stringify(toysData)} spring="gentle">
      <ul className="toys-list">
        {toysData.map((toy) => {
          return <ToyCard key={toy.num} toy={toy} />;
        })}
      </ul>
    </Flipper>
  );
};
