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
];

export default routes;
