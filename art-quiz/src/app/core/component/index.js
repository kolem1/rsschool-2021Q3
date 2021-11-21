import compileTemplate from './compileTemplate';

export default class Component {
  constructor(config = {}) {
    this.selector = config.selector;
    this.template = config.template;
    this.subcomponents = config.subcomponents;
    this.data = config.data;
    this.beforeInitFunction = config.beforeInitFunction;
    this.afterInitFunction = config.afterInitFunction;
    this.events = config.events;
  }

  render() {
    const el = document.querySelector(this.selector);
    if (el) el.innerHTML = compileTemplate(this.template, this.data);

    this.initEvents();

    this.renderSubcomponents();

    return this;
  }

  renderSubcomponents() {
    if (this.subcomponents) {
      this.subcomponents.forEach((c) => c.render());
    }
  }

  async beforeInit() {
    if (this.beforeInitFunction) {
      await this.beforeInitFunction();
    }
    return this;
  }

  async afterInit() {
    if (this.afterInitFunction) {
      await this.afterInitFunction();
    }
    return this;
  }

  initEvents() {
    if (this.events) {
      Object.keys(this.events).forEach((key) => {
        const listener = key.split(' ');

        const elements = document.querySelectorAll(listener[1]);

        elements.forEach((element) => {
          element.addEventListener(listener[0], this.events[key]);
        });
      });
    }
  }
}
