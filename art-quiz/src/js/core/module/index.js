export default class Module {
  constructor(config) {
    this.components = config.components;
  }

  start() {
    this.renderComponents();
  }

  renderComponents() {
    this.components.forEach((component) => {
      component.render();
    });
  }
}
