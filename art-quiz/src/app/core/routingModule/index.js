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
    let { component } = route;
    if (typeof component === 'function') {
      component = new component();
    }

    renderComponent(component);
  }
}
