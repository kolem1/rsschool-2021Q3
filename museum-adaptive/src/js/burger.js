const burger = document.querySelector('.burger');

burger.addEventListener('click', function(e) {
  e.preventDefault();
  this.closest('.header').classList.toggle('active');
})