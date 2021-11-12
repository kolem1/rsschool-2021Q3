export default function renderComponent(c) {
  if(c) c.render();
  c.afterInit();
}