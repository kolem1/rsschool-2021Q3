import router from '../tools/router';

export default class Module {
  constructor(config) {
    this.components = config.components;
    this.initialComponent = config.initialComponent;
    this.routes = config.routes;
  }

  start() {
    this.renderComponents();
    if (this.routes) this.initRoutes();
  }

  renderComponents() {
    this.initialComponent.render();
    this.components.forEach((component) => {
      component.render();
    });
  }

  initRoutes() {
    window.addEventListener('hashchange', this.renderRoute.bind(this));
    this.renderRoute();
  }

  renderRoute() {
    const hash = router.getUrl();
    const route = this.routes.find((r) => r.path === hash);
    const { component } = route;

    const main = document.querySelector('#main');
    main.innerHTML = `<div id="${component.selector.slice(1)}"></div>`;
    component.render();
  }
}
