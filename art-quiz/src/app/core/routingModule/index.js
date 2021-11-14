import renderComponent from '../component/renderComponent';
import router from './router';

export default class RoutingModule {
  constructor(routes) {
    this.routes = routes;
  }

  init() {
    window.addEventListener('hashchange', this.renderRoute.bind(this));
    this.renderRoute();
  }

  renderRoute() {
    const hash = router.getUrl();
    const route = this.routes.find((r) => r.path === hash);
    const { component } = route;

    const main = document.querySelector('#main');
    main.innerHTML = `<div id="${component.selector.slice(1)}"></div>`;
    renderComponent(component);
  }
}
