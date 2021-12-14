import React from 'react';
import { Footer } from './components/Footer/Footer';
import { Filter } from './components/Filter/FIlter';
import { ToysList } from './components/ToysList/ToysList';
import './App.css';
import useToysData from './hooks/useToysData';

const App: React.FC = function () {
  const [toysData, filterConfig, setFilterConfig] = useToysData([]);

  return (
    <div className="wrapper">
      <main className="main">
        <div className="toys-page">
          <div className="container">
            <div className="toys-page__filter">
              <Filter filterConfig={filterConfig} setFilterConfig={setFilterConfig} />
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
