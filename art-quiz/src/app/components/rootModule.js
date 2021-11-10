import Module from 'core/module';
import footer from './common/footer';
import homePage from './pages/homePage';
import settingsPage from './pages/settingsPage';
import rootComponent from './rootComponent';
import routes from './routes';

// class RootModule extends Module {
//   constructor(config) {
//     super(config);
//   }
// }

const rootModule = new Module({
  initialComponent: rootComponent,
  components: [
    footer,
    homePage,
    settingsPage,
  ],
  routes,
});

export default rootModule;
