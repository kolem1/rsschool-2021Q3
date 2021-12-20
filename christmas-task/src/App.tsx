import React, { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer, Header } from './components';
import { Home, Toys } from './pages';
import './App.css';
import useToysData from './hooks/useToysData';
import { IToy, IFilterConfig, FavoriteResponse } from './types/index';
import { Favorites } from './pages/Favorites/Favorites';

interface IMainContext {
  toysData: IToy[];
  filterConfig: IFilterConfig;
  setFilterConfig: React.Dispatch<React.SetStateAction<IFilterConfig>>;
  resetFilter: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setFavorite: (num: string) => FavoriteResponse;
  favoriteCount: number;
  resetAll: () => void;
  userFavorites: IToy[];
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
    resetAll,
    userFavorites,
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
      resetAll,
      userFavorites,
    }),
    [
      toysData,
      filterConfig,
      setFilterConfig,
      resetFilter,
      searchQuery,
      setSearchQuery,
      setFavorite,
      favoriteCount,
      resetAll,
      userFavorites,
    ]
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
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
        </MainContext.Provider>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
