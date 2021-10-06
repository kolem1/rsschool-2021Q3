import Swiper, {Navigation, Pagination} from "swiper";

import 'swiper/css';

Swiper.use([Navigation, Pagination]);

const welcomeSlider = new Swiper('.welcome-slider__slider', {
  loop: true,
  slidesPerView: 1,

  pagination: {
    el: '.welcome-slider__dots',
    clickable: true,
    bulletClass: 'slider-dots__dot',
    bulletActiveClass: 'slider-dots__dot--active',
  },

  navigation: {
    nextEl: '.welcome-slider__arrow-next',
    prevEl: '.welcome-slider__arrow-prev'
  },

  on: {
    init: function() {
      const fractionTotal = this.el.nextElementSibling.querySelector('.slider-fraction__total');
      let totalSlides  = 0;
      this.slides.forEach(item => {
        if(!item.classList.contains('swiper-slide-duplicate')) {
          totalSlides++
        }
      })
      fractionTotal.innerHTML = String(totalSlides).length < 2 ? '0' + totalSlides : totalSlides;
     },
    slideChange: function() {
      const fractionCurrent = this.el.nextElementSibling.querySelector('.slider-fraction__current');
      const currentSlide = this.realIndex + 1;
      fractionCurrent.innerHTML = String(currentSlide).length < 2 ? '0' + currentSlide : currentSlide;
    }
  }
});