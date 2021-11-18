export default function setMaxSizeForWrapper() {
  const categories = document.querySelector('.page-wrapper');
  const header = document.querySelector('.header');
  const footer = document.querySelector('.footer');
  const buttonsWrapper = document.querySelector('.page-buttons');

  categories.style.maxHeight = `calc(100vh - ${header.offsetHeight + footer.offsetHeight + buttonsWrapper.offsetHeight}px`;
}
