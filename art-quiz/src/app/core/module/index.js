import renderComponent from '../component/renderComponent';
import RoutingModule from '../routingModule';

export default class Module {
  constructor(config) {
    this.components = config.components;
    this.initialComponent = config.initialComponent;
    this.routes = config.routes;
  }

  async start() {
    await this.renderComponents();
    if (this.routes) this.initRoutinng();
  }

  async renderComponents() {
    await renderComponent(this.initialComponent);
    this.components.forEach(renderComponent);
  }

  initRoutinng() {
    if (this.routes.length < 1) return;

    const routing = new RoutingModule(this.routes);
    routing.init();
  }
}
