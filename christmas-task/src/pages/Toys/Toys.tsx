import React from 'react';
import { Filter, ToysList } from '../../components';

export const Toys: React.FC = function () {
  return (
    <div className="toys-page">
      <div className="container">
        <div className="toys-page__filter">
          <Filter />
        </div>
        <div className="toys-page__list">
          <ToysList />
        </div>
      </div>
    </div>
  );
};
