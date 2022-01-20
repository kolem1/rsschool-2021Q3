import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppView } from './AppView';
import { Garage, Winners } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <AppView>
        <Routes>
          <Route path="/" element={<Garage />}></Route>
          <Route path="/winners" element={<Winners />}></Route>
        </Routes>
      </AppView>
    </BrowserRouter>
  );
};

export default App;
