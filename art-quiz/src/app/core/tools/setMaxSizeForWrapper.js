export default function setMaxSizeForWrapper() {
  const categories = document.querySelector('.page-wrapper');
  const header = document.querySelector('.header');
  const footer = document.querySelector('.footer');
  const buttonsWrapper = document.querySelector('.page-buttons');
  const marginBottom = 20;

  categories.style.maxHeight = `calc(100vh - ${header.offsetHeight + footer.offsetHeight + buttonsWrapper.offsetHeight + marginBottom}px`;
}
