import './index.scss';

import Module from '../core/module';
import rootComponent from './rootComponent';

// class RootModule extends Module {
//   constructor(config) {
//     super(config);
//   }
// }

const rootModule = new Module({
  components: [
    rootComponent,
  ],
});

export default rootModule;
