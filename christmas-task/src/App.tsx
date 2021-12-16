import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Toys from './pages/Toys/Toys';
import './App.css';
import useToysData from './hooks/useToysData';
import { Header } from './components/Header/Header';

const App: React.FC = function () {
  const [toysData, filterConfig, setFilterConfig, resetFilter, searchQuery, setSearchQuery] = useToysData([]);

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/toys"
              element={
                <Toys
                  toysData={toysData}
                  filterConfig={filterConfig}
                  setFilterConfig={setFilterConfig}
                  resetFilter={resetFilter}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
