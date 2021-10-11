const goTopBtn = document.querySelector('.up-button');
goTopBtn.onclick = backToTop;
window.addEventListener('scroll', showHideButton);
showHideButton();

function showHideButton() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
      goTopBtn.classList.add('show');
    } else {
      goTopBtn.classList.remove('show');
    }
}

function backToTop() {
	if (window.pageYOffset > 0) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}