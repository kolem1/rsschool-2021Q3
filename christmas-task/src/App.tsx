import React, { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Toys from './pages/Toys/Toys';
import './App.css';
import useToysData, { defaultFilterConfig } from './hooks/useToysData';
import { Header } from './components/Header/Header';
import { IToy, IFilterConfig } from './types/index';

interface IMainContext {
  toysData: IToy[];
  filterConfig: IFilterConfig;
  setFilterConfig?: React.Dispatch<React.SetStateAction<IFilterConfig>>;
  resetFilter?: () => void;
  searchQuery?: string;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
}

export const MainContext = React.createContext<Partial<IMainContext>>({});

const App: React.FC = function () {
  const [toysData, filterConfig, setFilterConfig, resetFilter, searchQuery, setSearchQuery] = useToysData([]);

  const context = useMemo(
    () => ({
      toysData,
      filterConfig,
      setFilterConfig,
      resetFilter,
      searchQuery,
      setSearchQuery,
    }),
    [toysData, filterConfig, setFilterConfig, resetFilter, searchQuery, setSearchQuery]
  );
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <MainContext.Provider value={context}>
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/toys" element={<Toys />} />
            </Routes>
          </main>
        </MainContext.Provider>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
