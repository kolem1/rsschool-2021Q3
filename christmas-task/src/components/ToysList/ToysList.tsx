import React from 'react';
import { IToy } from '../../types/index';
import { ToyCard } from '../ToyCard/ToyCard';
import './ToysList.css';

interface IToysListProps {
  toys: IToy[];
}

export const ToysList: React.FC<IToysListProps> = function (props) {
  const { toys } = props;
  return (
    <ul className="toys-list">
      {toys.map((toy) => {
        return <ToyCard toy={toy} />;
      })}
    </ul>
  );
};
