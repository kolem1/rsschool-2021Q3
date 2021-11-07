export default class Component {
  constructor(config) {
    this.selector = config.selector;
    this.template = config.template;
  }

  render() {
    const el = document.querySelector(this.selector);
    if (el) el.innerHTML = this.template;
  }
}
