import categoriesPage from './pages/categoriesPage';
import categoryPage from './pages/categoryPage';
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

for(let i = 0; i < 12; i++) {
  routes.push({
    path: `artists/category/${i}`,
    component: categoryPage,
  });
  routes.push({
    path: `pictures/category/${i}`,
    component: categoryPage,
  });
}

export default routes;
