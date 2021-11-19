export default function showComponent(selector) {
  const promise = new Promise((resolve) => {
    const element = document.querySelector(selector);
    element.classList.remove('show');
    setTimeout(resolve, 500);
  });
  return promise;
}
