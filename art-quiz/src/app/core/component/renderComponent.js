export default async function renderComponent(c) {
  await c.beforeInit();
  await c.render();
  c.afterInit();
}
