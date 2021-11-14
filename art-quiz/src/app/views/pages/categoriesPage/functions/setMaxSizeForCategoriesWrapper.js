export default function setMaxSizeForCategoriesWrapper() {
  const categories = document.querySelector('.categories');
  const header = document.querySelector('.header');
  const footer = document.querySelector('.footer');
  const buttonsWrapper = document.querySelector('.page-buttons');
  const marginBottom = 20;

  categories.style.maxHeight = `calc(100vh - ${header.offsetHeight + footer.offsetHeight + buttonsWrapper.offsetHeight + marginBottom}px`;
}
