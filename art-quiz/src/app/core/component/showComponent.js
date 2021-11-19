export default function showComponent(selector) {
  const element = document.querySelector(selector);
  setTimeout(() => element.classList.add('show'), 300);
}
