const welcomeSlider = document.querySelector('.welcome-slider');
const sliders = welcomeSlider.querySelectorAll('.welcome-slide');

sliders.forEach(item => {
  const width = welcomeSlider.offsetWidth;
  item.style.width = width + 'px';
})

window.addEventListener('resize', function() {
  sliders.forEach((item) => {
    const width = welcomeSlider.offsetWidth;
    item.style.width = width + 'px';
  })
});
