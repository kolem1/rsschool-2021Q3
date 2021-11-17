import categoriesPage from './pages/categoriesPage';
import scorePage from './pages/scorePage';
import gamePage from './pages/gamePage';
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

for (let i = 0; i < 12; i += 1) {
  routes.push({
    path: `artists/category/${i}`,
    component: scorePage,
  });
  routes.push({
    path: `pictures/category/${i}`,
    component: scorePage,
  });
  routes.push({
    path: `artists/game/${i}`,
    component: gamePage,
  });
  routes.push({
    path: `pictures/game/${i}`,
    component: gamePage,
  });
}

export default routes;
