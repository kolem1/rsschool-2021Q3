import React, { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer, Header } from './components';
import { Home, Toys } from './pages';
import './App.css';
import useToysData from './hooks/useToysData';
import { IToy, IFilterConfig, FavoriteResponse } from './types/index';

interface IMainContext {
  toysData: IToy[];
  filterConfig: IFilterConfig;
  setFilterConfig: React.Dispatch<React.SetStateAction<IFilterConfig>>;
  resetFilter: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setFavorite: (num: string) => FavoriteResponse;
  favoriteCount: number;
}

export const MainContext = React.createContext<Partial<IMainContext>>({});

const App: React.FC = function () {
  const [
    toysData,
    filterConfig,
    setFilterConfig,
    resetFilter,
    searchQuery,
    setSearchQuery,
    setFavorite,
    favoriteCount,
  ] = useToysData([]);

  const context = useMemo(
    () => ({
      toysData,
      filterConfig,
      setFilterConfig,
      resetFilter,
      searchQuery,
      setSearchQuery,
      setFavorite,
      favoriteCount,
    }),
    [toysData, filterConfig, setFilterConfig, resetFilter, searchQuery, setSearchQuery, setFavorite, favoriteCount]
  );
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header favoriteCount={favoriteCount} />
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
