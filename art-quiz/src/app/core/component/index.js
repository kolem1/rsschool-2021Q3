export default class Component {
  constructor(config) {
    this.selector = config.selector;
    this.template = config.template;
    this.subcomponents = config.subcomponents;
    this.data = config.data;
    this.afterInitFunction = config.afterInitFunction;
  }

  render() {
    const el = document.querySelector(this.selector);
    if (el) el.innerHTML = compileTemplate(this.template, this.data);
    this.renderSubcomponents();
  }

  renderSubcomponents() {
    if (this.subcomponents) {
      this.subcomponents.forEach(c => c.render());
    }
  }

  afterInit() {
    if(this.afterInitFunction) this.afterInitFunction();
  }
}

function compileTemplate(template, data) {
  if(!data) return template;

  template = template.replace(/{{(.*?)}}/g, (str, key) => {
    key = key.trim();

    return data[key];
  })

  return template
}
