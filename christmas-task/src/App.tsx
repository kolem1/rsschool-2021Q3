import React, { useEffect, useState } from 'react';
import { Footer } from './components/Footer/Footer';
import { Filter } from './components/Filter/FIlter';
import { ToysList } from './components/ToysList/ToysList';
import './App.css';
import getToysData from './data/getToysData';
import { IToy } from './types/index';

const App: React.FC = function () {
  const [toysData, setToysData] = useState<IToy[]>([]);

  useEffect(() => {
    getToysData(setToysData);
  }, []);

  return (
    <div className="wrapper">
      <main className="main">
        <div className="toys-page">
          <div className="container">
            <div className="toys-page__filter">
              <Filter />
            </div>
            <div className="toys-page__list">
              <ToysList toys={toysData} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
