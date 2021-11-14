import Module from '../core/module';
import footer from './components/footer';
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
  ],
  routes,
});

export default rootModule;
