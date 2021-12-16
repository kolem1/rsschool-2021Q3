import React from 'react';
import { Filter } from '../../components/Filter/FIlter';
import { ToysList } from '../../components/ToysList/ToysList';
import { IToy, IFilterConfig } from '../../types/index';

interface IToysPage {
  toysData: IToy[];
  filterConfig: IFilterConfig;
  setFilterConfig: React.Dispatch<React.SetStateAction<IFilterConfig>>;
  resetFilter: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Toys: React.FC<IToysPage> = function ({
  toysData,
  filterConfig,
  setFilterConfig,
  resetFilter,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <div className="toys-page">
      <div className="container">
        <div className="toys-page__filter">
          <Filter
            filterConfig={filterConfig}
            setFilterConfig={setFilterConfig}
            resetFilter={resetFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="toys-page__list">
          <ToysList toys={toysData} />
        </div>
      </div>
    </div>
  );
};

export default Toys;
