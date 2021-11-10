import categoriesPage from './pages/categoriesPage';
import homePage from './pages/homePage';
import settingsPage from './pages/settingsPage';

const routes = [
  {
    path: '',
    component: homePage,
  },
  {
    path: 'settings',
    component: settingsPage,
  },
  {
    path: 'artists',
    component: categoriesPage,
  },
  {
    path: 'pictures',
    component: categoriesPage,
  },
];

export default routes;
