const button = document.querySelector('.modal-open');
const closeButton = document.querySelector('.modal__close');
const overlay = document.querySelector('.modal__overlay');

button.addEventListener('click', function() {
  const modalId = this.dataset.modal;
  const modal = document.querySelector(modalId);
  modal.classList.add('active')
})

closeButton.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

function closeModal() {
  const modal = this.closest('.modal');

  modal.classList.remove('active');
}