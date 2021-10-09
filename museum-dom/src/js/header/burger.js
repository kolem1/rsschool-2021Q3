const burger = document.querySelector('.burger');
const header = document.querySelector('.header');
const welcomeBody = document.querySelector('.welcome-section__body');

burger.addEventListener('click', function(e) {
  e.preventDefault();
  this.closest('.header').classList.toggle('active');
  welcomeBody.classList.toggle('menu-open')
});

document.body.addEventListener('click', function(e) {
  if(header.classList.contains('active') && e.target != burger) {
    if(!e.target.closest('.header-nav') || e.target.closest('.header-nav__link')) closeMenu();
  }
})

function closeMenu() {
  header.classList.remove('active');
  welcomeBody.classList.remove('menu-open');
}